fetch('/api/status')
  .then(res => res.json())
  .then(data => {
    document.getElementById('pod-status').textContent =
      `serving from: ${data.hostname}`;
  })
  .catch(() => {
    document.getElementById('pod-status').textContent =
      'status unavailable';
  });