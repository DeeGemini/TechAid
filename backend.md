To set up a system that approves which registered school users receive gadgets, follow this structured approach leveraging your existing endpoints and extending your API:

### 1. **School Verification Workflow**

- **Current State**: After registration, `is_verified=False` in the school schema.
- **Admin Verification Endpoint**:  
  Create an endpoint for admins to verify schools based on uploaded documents:

  ```python
  # New endpoint in admin_router.py
  from fastapi import Depends, HTTPException
  from app.services.schools import verify_school, get_school_by_id

  @admin_router.patch('/schools/{school_id}/verify', response_model=SchoolBase)
  async def verify_school_endpoint(
      school_id: str,
      is_approved: bool = Form(...),
      current_admin: dict = Depends(get_current_admin)  # Implement admin auth
  ):
      school = get_school_by_id(school_id)
      if not school:
          raise HTTPException(status_code=404, detail="School not found")

      if is_approved:
          verify_school(school_id)  # Updates is_verified=True in DB
          return JSONResponse(status_code=200, content={"message": "School verified"})
      else:
          # Optional: Send rejection email to school
          return JSONResponse(status_code=200, content={"message": "Verification rejected"})
  ```

### 2. **Gadget Reward System**

- **Gadget Donation Model**:  
  Add a `GadgetDonation` model to track donations:

  ```python
  # schemas/gadgets.py
  from pydantic import BaseModel
  from datetime import datetime

  class GadgetDonationBase(BaseModel):
      donation_id: str
      donor_id: str  # Links to donor user
      gadget_type: str  # e.g., "Laptop", "Tablet"
      quantity: int
      donation_date: datetime = datetime.now()
      status: str = "available"  # available, allocated
  ```

- **Donation Endpoint** (for donors):
  ```python
  # In donor_router.py
  @donor_router.post('/donate', response_model=GadgetDonationBase)
  async def donate_gadget(
      gadget_type: str = Form(...),
      quantity: int = Form(...),
      current_donor: dict = Depends(get_current_donor)  # Implement donor auth
  ):
      donation_data = {
          "donation_id": str(uuid.uuid4()),
          "donor_id": current_donor["donor_id"],
          "gadget_type": gadget_type,
          "quantity": quantity
      }
      save_donation(donation_data)  # Store in DB
      return donation_data
  ```

### 3. **Allocate Gadgets to Verified Schools**

- **Allocation Logic**:  
  Prioritize schools by registration date or need metrics.
- **Allocation Endpoint**:
  ```python
  # In admin_router.py
  @admin_router.post('/allocate-gadgets')
  async def allocate_gadgets(
      school_id: str = Form(...),
      gadget_type: str = Form(...),
      quantity: int = Form(...),
      current_admin: dict = Depends(get_current_admin)
  ):
      # Check school verification status
      school = get_school_by_id(school_id)
      if not school or not school.is_verified:
          raise HTTPException(status_code=400, detail="School not verified")

      # Check gadget availability
      if not check_gadget_availability(gadget_type, quantity):
          raise HTTPException(status_code=400, detail="Insufficient gadgets")

      # Allocate gadgets
      allocation_id = allocate_gadget_to_school(school_id, gadget_type, quantity)
      update_gadget_inventory(gadget_type, quantity)  # Reduce inventory
      send_allocation_email(school.email)  # Notify school
      return {"allocation_id": allocation_id}
  ```

### 4. **Key Database Structures**

- **Schools Table**:
  ```sql
  ALTER TABLE schools ADD COLUMN is_verified BOOLEAN DEFAULT FALSE;
  ```
- **Gadget Inventory Table**:
  ```sql
  CREATE TABLE gadget_inventory (
      gadget_type VARCHAR(50) PRIMARY KEY,
      available_quantity INT DEFAULT 0
  );
  ```
- **Allocations Table**:
  ```sql
  CREATE TABLE allocations (
      allocation_id UUID PRIMARY KEY,
      school_id UUID REFERENCES schools(school_id),
      gadget_type VARCHAR(50),
      quantity INT,
      allocation_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );
  ```

### 5. **Automate Inventory Updates**

- When donations are received:
  ```python
  # In donate_gadget endpoint
  def update_inventory(gadget_type: str, quantity: int):
      # Increment inventory count
      db.execute("""
          INSERT INTO gadget_inventory (gadget_type, available_quantity)
          VALUES (:type, :qty)
          ON CONFLICT (gadget_type) DO UPDATE
          SET available_quantity = gadget_inventory.available_quantity + :qty
      """, {"type": gadget_type, "qty": quantity})
  ```

### 6. **Security & Validation**

- **Admin Auth**: Use role-based access control (RBAC) for admin endpoints.
- **Input Validation**: Use Pydantic schemas for all form data.
- **Error Handling**: Return specific HTTP codes (403 for unauthorized, 404 for missing resources).

### Workflow Summary

1. **School Registers** → Uploads documents → `is_verified=False`
2. **Admin Verifies** → Approves/rejects via endpoint → Sets `is_verified=True`
3. **Donor Contributes** → Gadgets added to inventory
4. **Admin Allocates** → Verified schools receive gadgets → Inventory updated

This system ensures only verified schools receive gadgets, with clear audit trails through inventory and allocation tables. Extend with metrics (e.g., "gadgets allocated per school") for reporting.
