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

# In donate_gadget endpoint
def update_inventory(gadget_type: str, quantity: int):
    # Increment inventory count
    db.execute("""
        INSERT INTO gadget_inventory (gadget_type, available_quantity)
        VALUES (:type, :qty)
        ON CONFLICT (gadget_type) DO UPDATE
        SET available_quantity = gadget_inventory.available_quantity + :qty
    """, {"type": gadget_type, "qty": quantity})