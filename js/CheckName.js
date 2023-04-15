$(document).ready(function() {
  const name = sessionStorage.getItem('name');
  if (name) {
    $('#yourname').text(name);
    $('#action').text('Sign Out');
  }
  else {
    $('#yourname').text('Guest');
    $('#action').text('Sign In');
  }
});