// Format date according to the time zone
export const formatDate = (date, timeZone) => {
  return new Intl.DateTimeFormat('en-US', {
    timeZone,
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    timeZoneName: 'short' // Include timezone
  }).format(new Date(date)); // Format date
};

// Handle key down events for adding or editing tasks
export const handleKeyDown = (e, action, cancelAction) => {
  if (e.key === "Enter") {
    action(); // Call action if Enter key is pressed
  } else if (e.key === "Escape" && cancelAction) {
    cancelAction(); // Call cancelAction if Escape key is pressed
  }
};
