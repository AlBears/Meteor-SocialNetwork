Template.editProfile.onRendered(() => {
  $('#birthday').datepicker({
    autoclose: true,
    format: 'dd M yyyy'
  });
});
