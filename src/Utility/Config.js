const Config = ({
  //dev
  baseURL: 'https://dev-api.waliner.io/',
  //NGROK

  // baseURL: 'https://60fd-122-160-113-252.ngrok-free.app/',

  socketURL: 'https://dev-api.waliner.io/',
  // socketURL: 'https://fae3-223-223-154-95.ngrok-free.app',
  extendedUrl: 'api/',
  extendedUrlAuth: 'api/auth/',
  environment: 'development',
  //environment:'production',
  lastUpdate: '04/08/2023 01:10 PM',
  app_env: 'development',
  thumbnailSize: {
    size_width: 200,
    size_height: 200
  },
  planningEditableBeforeCurrentDay: 0,
  pageDataLimit: 10,
  whatsApp_action_name: "whatsApp_message",
  whatsApp_phone_number: "whatsApp_phone_number",
  configureChannelMappingUrl: "http://localhost",
  versionOption: [
    { value: 'v1', label: 'V1' },
    { value: 'v2', label: 'V2' },
    { value: 'v3', label: 'V3' },
  ],

  phoneNumberWithOrwithoutPlus: "",
  phoneNumberWithoutPlus: "91",
  phoneNumberCountrySeet: "in",
  permission: {
    "app_admin": [
      "home_module", "users_tab", "users_add", "users_edit", "users_delete", "users_resetPassword",
      "organisation_tab", "organisation_add", "organisation_edit", "organisation_delete",
      "chatHistory_module", "leads_tab",
      "opportunity_tab",
      "futureOpportunity_tab",
      "inactive_tab",
      "otherSources_tab",
      "setting_module", "template_tab",
      "templateMapping_tab",
      "channelMapping_tab"
    ],
    "admin": [
      "home_module", "users_tab", "users_add", "users_edit", "users_delete", "users_resetPassword",
      "chatHistory_module", "leads_tab", "leadsChatInputPannel",
      "opportunity_tab", "opportunityChatInputPannel",
      "futureOpportunity_tab", "futureOpportunityChatInputPannel",
      "inactive_tab", "inactiveChatInputPannel",
      "otherSources_tab",
      "setting_module", "template_tab", "template_add", "template_edit", "template_delete",
      "templateMapping_tab", "templateMapping_add", "templateMapping_edit", "templateMapping_delete",
      "channelMapping_tab", "channelMapping_add", "channelMapping_edit", "channelMapping_delete",
    ],
    "user": []
  },
  templateDescriptionCharactersLimit: 1024,
  interactiveButtonTypeHeaderCharactersLimit: 20,
  interactiveListTypeHeaderCharactersLimit: 60,
  interactiveFooterCharactersLimit: 60,
  interactiveListTitleCharactersLimit: 20,
  interactiveButtonTitleCharactersLimit: 20,
  interactiveRowTitleCharactersLimit: 24,
  interactiveRowDescriptionCharactersLimit: 72,
  textButtonTextCustom: 25,
  timeZone: 'IST',
  //social login credentials
  //facebookAppID: "526768246300429", //Facebook business
  // facebookAppID: "1362032644666186", //Test app Facebook business
  facebookAppID: "329102239502979", //Only facebook
  isBusiness: true,
  facebookRedirectUrl: "",
  //configId: "1011327420122639", //Group and page manage
  //configId: "984946812833909", //business id manage
  configId: "797797202085067", // test appbusiness id manage
  googleAppID: "659226726328-66qinf1vaktt60rbtbnkecag5ijodd8b.apps.googleusercontent.com",
  googleRedirectUrl: "https://dev.waliner.io/"
});

export default Config;