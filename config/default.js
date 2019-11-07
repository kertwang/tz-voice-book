const config = {
  /* private envs. Refer to .env.<stage>.sh */
  twilio_account_sid:'__PRIVATE__', 
  twilio_auth_token:'__PRIVATE__',
  twilio_outbound_number:'__PRIVATE__',
  test_mobile: '__PRIVATE__',

  /* public envs - these are the default values */
  base_url: 'http://localhost:3000',
  temporary_insecure_auth_key:'',
  service_account_key_file_name:'',
  database_url:'',
  storage_bucket:'',
  informal_notification_url: '',
  formal_notification_url: '',
  mm_101_url: '',
  should_log: false,
  should_display_english_test_call: '',
  test_call_url: '',
  relay_default_country_code: '',
  url_prefix: '',
  firebase_token: '',
  opt_out_webhook_url: '',
  should_log_twilio_response: false,

  /* Overriden by heroku, just here for reference as they will make it into the final config object */
  PORT: '3000',
  DATABASE_URL: 'postgres://postgres:example@localhost:5432/s4'
}

module.exports = config