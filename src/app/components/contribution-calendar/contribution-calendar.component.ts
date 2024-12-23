import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';

interface ContributionDay {
  date: Date;
  count: number;
  color: string;
}

@Component({
  selector: 'app-contribution-calendar',
  templateUrl: './contribution-calendar.component.html',
  styleUrls: ['./contribution-calendar.component.css'],
})
export class ContributionCalendarComponent implements OnInit, OnChanges {
  @Input() contributionData: {
    [key: string]: { count: number; color: string };
  } = {};

  months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
  weekdays = ['Mon', 'Wed', 'Fri'];
  contributionLevels = [0, 1, 5, 10, 20]; // Customize these thresholds
  calendar: ContributionDay[][] = [];

  ngOnChanges(changes: SimpleChanges) {
    if (changes['contributionData']) {
      this.generateCalendar();
    }
  }

  ngOnInit() {}

  generateCalendar() {
    const today = new Date();
    const oneYearAgo = new Date();
    oneYearAgo.setFullYear(today.getFullYear() - 1);

    // Initialize weeks array
    const weeks: ContributionDay[][] = [];
    let currentWeek: ContributionDay[] = [];

    // Fill in missing days from start of week
    const startDay = oneYearAgo.getDay();
    for (let i = 0; i < startDay; i++) {
      currentWeek.push({ date: new Date(0), count: -1, color: '' });
    }

    // Generate calendar data
    for (let d = oneYearAgo; d <= today; d.setDate(d.getDate() + 1)) {
      const dateStr = this.formatDate(d);
      const obj = this.contributionData[dateStr] || 0;

      currentWeek.push({
        date: new Date(d),
        count: obj.count,
        color: obj.color,
      });

      if (currentWeek.length === 7) {
        weeks.push([...currentWeek]);
        currentWeek = [];
      }
    }

    // Fill in remaining days of the last week
    while (currentWeek.length < 7) {
      currentWeek.push({ date: new Date(0), count: -1, color: '' });
    }
    if (currentWeek.length > 0) {
      weeks.push(currentWeek);
    }

    this.calendar = weeks;
  }

  getColorForCount(count: number): string {
    if (count < 0) return '#ebedf0';
    if (count === 0) return '#ebedf0';
    if (count <= 3) return '#9be9a8';
    if (count <= 6) return '#40c463';
    if (count <= 9) return '#30a14e';
    return '#216e39';
  }

  formatDate(date: Date): string {
    return date.toISOString().split('T')[0];
  }

  getTooltipText(day: ContributionDay): string {
    if (day.count < 0) return '';
    const date = day.date.toDateString();
    return `${day.count} contributions on ${date}`;
  }
}
