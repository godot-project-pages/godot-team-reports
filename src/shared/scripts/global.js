const READING_SPEED = 200;

// API Interaction
const ReportsAPI = {
  async get(path = '/') {
    const res = await fetch(`${path}`);
    if (res.status !== 200) {
      return null;
    }

    return await res.json();
  },

  async getData() {
    return await this.get("data.json");
  },
};

// Content helpers
const ReportsFormatter = {
  formatDate(dateString) {
    const options = {
      year: 'numeric', month: 'long', day: 'numeric',
    };
    const dateFormatter = new Intl.DateTimeFormat('en-US', options);

    const date = new Date(dateString);
    return dateFormatter.format(date);
  },

  formatTimestamp(timeString) {
    const options = {
      year: 'numeric', month: 'long', day: 'numeric',
      hour: 'numeric', hour12: false, minute: 'numeric',
      timeZone: 'UTC', timeZoneName: 'short',
    };
    const dateFormatter = new Intl.DateTimeFormat('en-US', options);

    const date = new Date(timeString);
    return dateFormatter.format(date);
  },

  formatTimespan(timeValue, timeUnit) {
    const options = {
      style: 'long',
    };
    const timeFormatter = new Intl.RelativeTimeFormat('en-US', options);

    return timeFormatter.format(timeValue, timeUnit);
  },

  getDaysSince(dateString) {
    const date = new Date(dateString);
    const msBetween = (new Date()) - date;
    const days = Math.floor(msBetween / (1000 * 60 * 60 * 24));

    return days;
  },

  formatDays(days) {
    return days + " " + (days !== 1 ? "days" : "day");
  },
};

const ReportsUtils = {
  createEvent(name, detail = {}) {
    return  new CustomEvent(name, {
      detail: detail
    });
  },

  getHistoryHash() {
    let rawHash = window.location.hash;
    if (rawHash !== "") {
      return rawHash.substr(1);
    }

    return "";
  },

  setHistoryHash(hash) {
    const url = new URL(window.location);
    url.hash = hash;
    window.history.pushState({}, "", url);
  },
};

const ReportsSingleton = {
  api: ReportsAPI,
  format: ReportsFormatter,
  util: ReportsUtils,
};

window.greports = ReportsSingleton;