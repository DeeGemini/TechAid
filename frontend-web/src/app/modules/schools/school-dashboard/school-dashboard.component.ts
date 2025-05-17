import { Component, OnInit } from '@angular/core';
import { IconName } from '@fortawesome/fontawesome-svg-core';


interface StatCard {
  icon: string;
  value: number | string;
  title: string;
  trend?: 'up' | 'down';
  trendValue?: string;
  color?: string;
}

interface RecentActivity {
  id: number;
  type: 'device' | 'hotspot' | 'student';
  title: string;
  description: string;
  date: Date;
  status?: 'pending' | 'completed' | 'rejected';
}

@Component({
  selector: 'app-school-dashboard',
  templateUrl: './school-dashboard.component.html',
  styleUrls: ['./school-dashboard.component.scss']
})
export class SchoolDashboardComponent implements OnInit {
  primaryColor = '#8a4fff';
  statCards: StatCard[] = [
    { icon: 'fa-laptop', value: 24, title: 'Devices Received', trend: 'up', trendValue: '12%', color: '#4CAF50' },
    { icon: 'fa-wifi', value: 8, title: 'Hotspots Available', trend: 'down', trendValue: '5%', color: '#2196F3' },
    { icon: 'fa-users', value: 156, title: 'Students Benefited', trend: 'up', trendValue: '23%', color: '#9C27B0' },
    { icon: 'fa-check-circle', value: '83%', title: 'Completion Rate', color: '#FF9800' }
  ];

  recentActivities: RecentActivity[] = [
    { id: 1, type: 'device', title: 'New Device Donation', description: 'Received 5 laptops from TechForAll Foundation', date: new Date(), status: 'completed' },
    { id: 2, type: 'hotspot', title: 'Hotspot Request', description: 'Requested access to community hotspot near campus', date: new Date(Date.now() - 86400000), status: 'pending' },
    { id: 3, type: 'student', title: 'New Student Registration', description: 'Added 12 new students to the program', date: new Date(Date.now() - 172800000), status: 'completed' },
    { id: 4, type: 'device', title: 'Device Maintenance', description: 'Sent 3 devices for repairs', date: new Date(Date.now() - 259200000), status: 'pending' }
  ];

  chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true
      }
    }
  };

  chartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Devices Received',
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1
      },
      {
        label: 'Students Benefited',
        data: [30, 42, 15, 27, 18, 24],
        backgroundColor: 'rgba(153, 102, 255, 0.2)',
        borderColor: 'rgba(153, 102, 255, 1)',
        borderWidth: 1
      }
    ]
  };

  constructor() { }

  ngOnInit(): void {
  }

  getStatusClass(status: string | undefined): string {
    switch (status) {
      case 'pending': return 'status-pending';
      case 'completed': return 'status-completed';
      case 'rejected': return 'status-rejected';
      default: return '';
    }
  }

  getActivityIcon(type: string): string {
    switch (type) {
      case 'device': return 'laptop';
      case 'hotspot': return 'wifi';
      case 'student': return 'user-graduate';
      default: return 'info-circle';
    }
  }
}
