export const templates = {
  'brand': {
    "creator": "1",
    "name": "Brand Survey",
    "description": "Brand description",
    // "isPublished": "False",
    "needLoggedUser": "False",
    "displayByQuestion": "False",
    "surveyQuestions": [
      {
        "type": "dropbox",
        "text": "When you think of __________, (product category) which brand comes to mind ?",
        "choices": [
          "____________ competitor 1",
          "____________ competitor 2",
          "____________ competitor 3"
        ],
        "tabNames": [
          ""
        ],
        "required": "true",
        "admin_question": false,
        "tag": "dropbox",
        "setType": "optionSet",
        "survey": "null",
        "order": "1",
        "tab": "",
        "dependentQuestion": "",
        "dependentOption": "",
        "id":"",
        "temp_id": "control_1"
      },
      {
        "type": "dropbox",
        "text": "Among this list of brands, how would you rank them for your likability ?",
        "choices": [
          "____________ competitor 1",
          "____________ competitor 2",
          "____________ competitor 3"
        ],
        "tabNames": [
          ""
        ],
        "required": "true",
        "admin_question": false,
        "tag": "dropbox",
        "setType": "optionSet",
        "survey": "null",
        "order": "1",
        "tab": "",
        "dependentQuestion": "",
        "dependentOption": "",
        "id":"",
        "temp_id": "control_1"
      },
      {
        "type": "dropbox",
        "text": "Next time you go out to make purchases, which of these brands you are most likely to try out / buy ?",
        "choices": [
          "____________ competitor 1",
          "____________ competitor 2",
          "____________ competitor 3"
        ],
        "tabNames": [
          ""
        ],
        "required": "true",
        "admin_question": false,
        "tag": "dropbox",
        "setType": "optionSet",
        "survey": "null",
        "order": "1",
        "tab": "",
        "dependentQuestion": "",
        "dependentOption": "",
        "id":"",
        "temp_id": "control_1"
      },
      {
        "type": "radio",
        "text": "Are you aware of ___________? (Product/Brand name)",
        "choices": [
          "Yes",
          "No"
        ],
        "tabNames": [         
          ""
        ],
        "required": "true",
        "admin_question": false,
        "tag": "radio",
        "setType": "optionSet",
        "survey": "null",
        "order": "1",
        "tab": "",
        "dependentQuestion": "",
        "dependentOption": "",
        "id":"",
        "temp_id": "control_2"
      },
      {
        "type": "checkbox",
        "text": "Where have you heard of __________? (Product/Brand name)",
        "choices": [
          "Friends",
          "Ads on Facebook / Instagram / Youtube",
          "Online ads at other websites",
          "Saw an ad while searching",
          "TV ad",
          "Print ad",
          "Radio ad",
          "Outdoor hoarding",
          "Promotional material in shops"
        ],
        "tabNames": [
          ""
        ],
        "required": "true",
        "admin_question": false,
        "tag": "checkbox",
        "setType": "optionSet",
        "survey": "null",
        "order": "1",
        "tab": "",
        "dependentQuestion": "",
        "dependentOption": "",
        "id":"",
        "temp_id": "control_1"
      },
      {
        "type": "radio",
        "text": "Have you had the chance to buy ________? (Product/Brand name)",
        "choices": [
          "Yes",
          "No"
        ],
        "tabNames": [
          "",
          ""
        ],
        "required": "true",
        "tag": "radio",
        "setType": "optionSet",
        "survey": "null",
        "order": "1",
        "tab": "",
        "dependentQuestion": "",
        "dependentOption": ""
      },
      {
        "type": "radio",
        "text": "Have you had a chance to buy ___________ again?",
        "choices": [
          "Yes, I am a regular buyer",
          "Yes, I buy it sometimes",
          "Yes, I bought it once",
          "Not bought again"
        ],
        "tabNames": [
          "",
          "",
          "",
          ""
        ],
        "required": "true",
        "tag": "radio",
        "setType": "optionSet",
        "survey": "null",
        "order": "1",
        "tab": "",
        "dependentQuestion": "",
        "dependentOption": ""
      },
      {
        "type": "radio",
        "text": "How would you qualify your experience with ______________?",
        "choices": [
          "Great",
          "Good",
          "Ok",
          "Not so Good",
          "Not good at all"
        ],
        "tabNames": [
          "",
          "",
          "",
          "",
          ""
        ],
        "required": "true",
        "tag": "radio",
        "setType": "optionSet",
        "survey": "null",
        "order": "1",
        "tab": "",
        "dependentQuestion": "",
        "dependentOption": ""
      },
      {
        "type": "checkbox",
        "text": "What are the aspects of the brand that you like the most?",
        "choices": [
          "Love the brand & what it stands for",
          "It has quite a brag value in my circle",
          "Quality of the product",
          "Stylish and innovative packaging",
          "Love the taste & look"
        ],
        "tabNames": [
          ""
        ],
        "required": "true",
        "tag": "checkbox",
        "setType": "optionSet",
        "survey": "null",
        "order": "1",
        "tab": "",
        "dependentQuestion": "",
        "dependentOption": ""
      },
      {
        "type": "radio",
        "text": "Would you recommend __________ to your family & friends?",
        "choices": [
          "Would love to recommend it",
          "Not sure",
          "Would not recommend"
        ],
        "tabNames": [
          "",
          "",
          ""
        ],
        "required": "true",
        "tag": "radio",
        "setType": "optionSet",
        "survey": "null",
        "order": "1",
        "tab": "",
        "dependentQuestion": "",
        "dependentOption": ""
      }
    ],
    "tabs": [
      {
        "questions": [
          {
            "type": "checkbox",
            "text": "Where have you heard of __________? (Product/Brand name) ",
            "choices": [
              "Friends",
              "Ads on Facebook / Instagram / Youtube",
              "Online ads at other websites",
              "Saw an ad while searching",
              "TV ad",
              "Print ad",
              "Radio ad",
              "Outdoor hoarding",
              "Promotional material in shops"
            ],
            "tabNames": [
              ""
            ],
            "required": "true",
            "tag": "checkbox",
            "setType": "optionSet",
            "survey": "null",
            "order": "1",
            "tab": "",
            "dependentQuestion": "",
            "dependentOption": ""
          },
          {
            "type": "radio",
            "text": "Have you had the chance to buy ________? (Product/Brand name)",
            "choices": [
              "Yes",
              "No"
            ],
            "tabNames": [
              "",
              ""
            ],
            "required": "true",
            "tag": "radio",
            "setType": "optionSet",
            "survey": "null",
            "order": "1",
            "tab": "",
            "dependentQuestion": "",
            "dependentOption": ""
          },
          {
            "type": "radio",
            "text": "Have you had a chance to buy ___________ again?",
            "choices": [
              "Yes, I am a regular buyer",
              "Yes, I buy it sometimes",
              "Yes, I bought it once",
              "Not bought again"
            ],
            "tabNames": [
              "",
              "",
              "",
              ""
            ],
            "required": "true",
            "tag": "radio",
            "setType": "optionSet",
            "survey": "null",
            "order": "1",
            "tab": "",
            "dependentQuestion": "",
            "dependentOption": ""
          },
          {
            "type": "radio",
            "text": "How would you qualify your experience with ______________?",
            "choices": [
              "Great",
              "Good",
              "Ok",
              "Not so Good",
              "Not good at all"
            ],
            "tabNames": [
              "",
              "",
              "",
              "",
              ""
            ],
            "required": "true",
            "tag": "radio",
            "setType": "optionSet",
            "survey": "null",
            "order": "1",
            "tab": "",
            "dependentQuestion": "",
            "dependentOption": ""
          },
          {
            "type": "checkbox",
            "text": "What are the aspects of the brand that you like the most?",
            "choices": [
              "Love the brand & what it stands for",
              "It has quite a brag value in my circle",
              "Quality of the product",
              "Stylish and innovative packaging",
              "Love the taste & look"
            ],
            "tabNames": [
              ""
            ],
            "required": "true",
            "tag": "checkbox",
            "setType": "optionSet",
            "survey": "null",
            "order": "1",
            "tab": "",
            "dependentQuestion": "",
            "dependentOption": ""
          },
          {
            "type": "radio",
            "text": "Would you recommend __________ to your family & friends?",
            "choices": [
              "Would love to recommend it",
              "Not sure",
              "Would not recommend"
            ],
            "tabNames": [
              "",
              "",
              ""
            ],
            "required": "true",
            "tag": "radio",
            "setType": "optionSet",
            "survey": "null",
            "order": "1",
            "tab": "",
            "dependentQuestion": "",
            "dependentOption": ""
          }
        ]
      }
    ]
  },
  product: {
    "creator": "1",
    "name": "Product survey",
    "description": "template",
    // "isPublished": "False",
    "needLoggedUser": "False",
    "displayByQuestion": "False",
    "surveyQuestions": [
      {
        "type": "radio",
        "text": "Have you heard of __ ?",
        "choices": [
          "Yes",
          "No"
        ],
        "tabNames": [
          ""
        ],
        "required": "true",
        "admin_question": false,
        "tag": "radio",
        "setType": "optionSet",
        "survey": "null",
        "order": "1",
        "tab": "",
        "dependentQuestion": "",
        "dependentOption": "",
        "temp_id": "control_1"
      },
      {
        "type": "checkbox",
        "text": "Where have you heard of __________?",
        "choices": [
          "Friends",
          "Ads on Facebook / Instagram / YouTube",
          "Online ads at other websites",
          "Saw an ad while searching",
          "TV ad",
          "Radio ad",
          "Print ad",
          "Outdoor hoarding",
          "Promotional material in shops"
        ],
        "tabNames": [
          ""
        ],
        "required": "true",
        "tag": "checkbox",
        "setType": "optionSet",
        "survey": "null",
        "order": "1",
        "tab": "",
        "dependentQuestion": "",
        "dependentOption": ""
      },
      {
        "type": "radio",
        "text": "Do you feel that ___________ is meant for you?",
        "choices": [
          "Absolutely",
          "Somewhat",
          "Not sure",
          "Not quite",
          "Not at all"
        ],
        "tabNames": [
          "",
          "",
          "",
          "",
          ""
        ],
        "required": "true",
        "tag": "radio",
        "setType": "optionSet",
        "survey": "null",
        "order": "1",
        "tab": "",
        "dependentQuestion": "",
        "dependentOption": ""
      },
      {
        "type": "radio",
        "text": "Have you had a chance to use ___________? ",
        "choices": [
          "Yes",
          "No"
        ],
        "tabNames": [
          "",
          ""
        ],
        "required": "true",
        "tag": "radio",
        "setType": "optionSet",
        "survey": "null",
        "order": "1",
        "tab": "",
        "dependentQuestion": "",
        "dependentOption": ""
      },
      {
        "type": "radio",
        "text": "If yes, how would you describe your experience with",
        "choices": [
          "Loved the product",
          "Quite like it",
          "Ok with it",
          "Don't like it as much",
          "Don't like it at all"
        ],
        "tabNames": [
          "",
          "",
          "",
          "",
          ""
        ],
        "required": "true",
        "tag": "radio",
        "setType": "optionSet",
        "survey": "null",
        "order": "1",
        "tab": "",
        "dependentQuestion": "3",
        "dependentOption": "Yes"
      },
      {
        "type": "radio",
        "text": "Will you try the product once again?",
        "choices": [
          "Yes, absolutely",
          "Might try it",
          "May not try it again"
        ],
        "tabNames": [
          "",
          "",
          ""
        ],
        "required": "true",
        "tag": "radio",
        "setType": "optionSet",
        "survey": "null",
        "order": "1",
        "tab": "",
        "dependentQuestion": "4",
        "dependentOption": "Loved the product@@@Quite like it@@@Ok with it"
      },
      {
        "type": "checkbox",
        "text": "What do you like about the product?",
        "choices": [
          "The overall experience of the product",
          "Taste / feel of the product",
          "Packaging / the way the product looks",
          "Utility of the product"
        ],
        "tabNames": [
          ""
        ],
        "required": "true",
        "tag": "checkbox",
        "setType": "optionSet",
        "survey": "null",
        "order": "1",
        "tab": "",
        "dependentQuestion": "3",
        "dependentOption": "Yes"
      },
      {
        "type": "radio",
        "text": "What do you dislike about the product? ",
        "choices": [
          "The overall experience of the product",
          "Taste / feel of the product",
          "Packaging / the way the product looks",
          "Utility of the product"
        ],
        "tabNames": [
          ""
        ],
        "required": "true",
        "tag": "radio",
        "setType": "optionSet",
        "survey": "null",
        "order": "1",
        "tab": "",
        "dependentQuestion": "",
        "dependentOption": ""
      },
      {
        "type": "radio",
        "text": "Were you able to find ­­­­­­­­­­­­­­­­_________ easily when you looked for it?",
        "choices": [
          "Yes",
          "No"
        ],
        "tabNames": [
          "",
          ""
        ],
        "required": "true",
        "tag": "radio",
        "setType": "optionSet",
        "survey": "null",
        "order": "1",
        "tab": "",
        "dependentQuestion": "8",
        "dependentOption": ""
      },
      {
        "type": "radio",
        "text": "Did you look for the product at all?",
        "choices": [
          "Yes",
          "No"
        ],
        "tabNames": [
          "",
          ""
        ],
        "required": "true",
        "tag": "radio",
        "setType": "optionSet",
        "survey": "null",
        "order": "1",
        "tab": "",
        "dependentQuestion": "8",
        "dependentOption": ""
      },
      {
        "type": "checkbox",
        "text": "If Yes, then where were you able to find it?",
        "choices": [
          "E-commerce site",
          "App based marketplace",
          "Neighbourhood store",
          "Large departmental store away from home",
          "Supermarket / large mall store"
        ],
        "tabNames": [
          ""
        ],
        "required": "true",
        "tag": "checkbox",
        "setType": "optionSet",
        "survey": "null",
        "order": "1",
        "tab": "",
        "dependentQuestion": "9",
        "dependentOption": "Yes"
      },
      {
        "type": "radio",
        "text": "Where would you like the product to be available ?",
        "choices": [
          "E-commerce site ",
          "App based marketplace",
          "Neighbourhood store ",
          "Large departmental store away from home",
          "Supermarket / large mall store"
        ],
        "tabNames": [
          "",
          "",
          "",
          "",
          ""
        ],
        "required": "true",
        "tag": "radio",
        "setType": "optionSet",
        "survey": "null",
        "order": "1",
        "tab": "",
        "dependentQuestion": "",
        "dependentOption": ""
      },
      {
        "type": "radio",
        "text": "Are you happy paying the price that you pay for __________?",
        "choices": [
          "Quite happy",
          "Somewhat happy",
          "Ok",
          "Not happy",
          "Very unhappy"
        ],
        "tabNames": [
          "",
          "",
          "",
          "",
          ""
        ],
        "required": "true",
        "tag": "radio",
        "setType": "optionSet",
        "survey": "null",
        "order": "1",
        "tab": "",
        "dependentQuestion": "",
        "dependentOption": ""
      }
    ],
    "tabs": [
      {
        "questions": [
          {
            "type": "checkbox",
            "text": "Where have you heard of __________?",
            "choices": [
              "Friends",
              "Ads on Facebook / Instagram / YouTube",
              "Online ads at other websites",
              "Saw an ad while searching",
              "TV ad",
              "Radio ad",
              "Print ad",
              "Outdoor hoarding",
              "Promotional material in shops"
            ],
            "tabNames": [
              ""
            ],
            "required": "true",
            "tag": "checkbox",
            "setType": "optionSet",
            "survey": "null",
            "order": "1",
            "tab": "",
            "dependentQuestion": "",
            "dependentOption": ""
          },
          {
            "type": "radio",
            "text": "Do you feel that ___________ is meant for you?",
            "choices": [
              "Absolutely",
              "Somewhat",
              "Not sure",
              "Not quite",
              "Not at all"
            ],
            "tabNames": [
              "",
              "",
              "",
              "",
              ""
            ],
            "required": "true",
            "tag": "radio",
            "setType": "optionSet",
            "survey": "null",
            "order": "1",
            "tab": "",
            "dependentQuestion": "",
            "dependentOption": ""
          },
          {
            "type": "radio",
            "text": "Have you had a chance to use ___________? ",
            "choices": [
              "Yes",
              "No"
            ],
            "tabNames": [
              "",
              ""
            ],
            "required": "true",
            "tag": "radio",
            "setType": "optionSet",
            "survey": "null",
            "order": "1",
            "tab": "",
            "dependentQuestion": "",
            "dependentOption": ""
          },
          {
            "type": "radio",
            "text": "If yes, how would you describe your experience with",
            "choices": [
              "Loved the product",
              "Quite like it",
              "Ok with it",
              "Don't like it as much",
              "Don't like it at all"
            ],
            "tabNames": [
              "",
              "",
              "",
              "",
              ""
            ],
            "required": "true",
            "tag": "radio",
            "setType": "optionSet",
            "survey": "null",
            "order": "1",
            "tab": "",
            "dependentQuestion": "3",
            "dependentOption": "Yes"
          },
          {
            "type": "radio",
            "text": "Will you try the product once again?",
            "choices": [
              "Yes, absolutely",
              "Might try it",
              "May not try it again"
            ],
            "tabNames": [
              "",
              "",
              ""
            ],
            "required": "true",
            "tag": "radio",
            "setType": "optionSet",
            "survey": "null",
            "order": "1",
            "tab": "",
            "dependentQuestion": "4",
            "dependentOption": "Loved the product@@@Quite like it@@@Ok with it"
          },
          {
            "type": "checkbox",
            "text": "What do you like about the product?",
            "choices": [
              "The overall experience of the product",
              "Taste / feel of the product",
              "Packaging / the way the product looks",
              "Utility of the product"
            ],
            "tabNames": [
              ""
            ],
            "required": "true",
            "tag": "checkbox",
            "setType": "optionSet",
            "survey": "null",
            "order": "1",
            "tab": "",
            "dependentQuestion": "3",
            "dependentOption": "Yes"
          },
          {
            "type": "checkbox",
            "text": "What do you dislike about the product? ",
            "choices": [
              "The overall experience of the product",
              "Taste / feel of the product",
              "Packaging / the way the product looks",
              "Utility of the product"
            ],
            "tabNames": [
              ""
            ],
            "required": "true",
            "tag": "checkbox",
            "setType": "optionSet",
            "survey": "null",
            "order": "1",
            "tab": "",
            "dependentQuestion": "",
            "dependentOption": ""
          },
          {
            "type": "radio",
            "text": "Were you able to find ­­­­­­­­­­­­­­­­_________ easily when you looked for it?",
            "choices": [
              "Yes",
              "No"
            ],
            "tabNames": [
              "",
              ""
            ],
            "required": "true",
            "tag": "radio",
            "setType": "optionSet",
            "survey": "null",
            "order": "1",
            "tab": "",
            "dependentQuestion": "8",
            "dependentOption": "Yes"
          },
          {
            "type": "radio",
            "text": "Did you look for the product at all?",
            "choices": [
              "Yes",
              "No"
            ],
            "tabNames": [
              "",
              ""
            ],
            "required": "true",
            "tag": "radio",
            "setType": "optionSet",
            "survey": "null",
            "order": "1",
            "tab": "",
            "dependentQuestion": "8",
            "dependentOption": "Yes"
          },
          {
            "type": "checkbox",
            "text": "If Yes, then where were you able to find it?",
            "choices": [
              "E-commerce site",
              "App based marketplace",
              "Neighbourhood store",
              "Large departmental store away from home",
              "Supermarket / large mall store"
            ],
            "tabNames": [
              ""
            ],
            "required": "true",
            "tag": "checkbox",
            "setType": "optionSet",
            "survey": "null",
            "order": "1",
            "tab": "",
            "dependentQuestion": "9",
            "dependentOption": "Yes"
          },
          {
            "type": "radio",
            "text": "Where would you like the product to be available ?",
            "choices": [
              "E-commerce site ",
              "App based marketplace",
              "Neighbourhood store ",
              "Large departmental store away from home",
              "Supermarket / large mall store"
            ],
            "tabNames": [
              "",
              "",
              "",
              "",
              ""
            ],
            "required": "true",
            "tag": "radio",
            "setType": "optionSet",
            "survey": "null",
            "order": "1",
            "tab": "",
            "dependentQuestion": "",
            "dependentOption": ""
          },
          {
            "type": "radio",
            "text": "Are you happy paying the price that you pay for __________?",
            "choices": [
              "Quite happy",
              "Somewhat happy",
              "Ok",
              "Not happy",
              "Very unhappy"
            ],
            "tabNames": [
              "",
              "",
              "",
              "",
              ""
            ],
            "required": "true",
            "tag": "radio",
            "setType": "optionSet",
            "survey": "null",
            "order": "1",
            "tab": "",
            "dependentQuestion": "",
            "dependentOption": ""
          }
        ],
        "end": false
      }
    ]
  },
  communication: {
    "creator": "1",
    "name": "Communication Survey",
    "description": "Template",
    // "isPublished": "False",
    "needLoggedUser": "False",
    "displayByQuestion": "False",
    "surveyQuestions": [
      {
        "type": "radio",
        "text": "Have you had a chance to see the ad of ­­­­­­___________?",
        "choices": [
          "Yes",
          "No"
        ],
        "tabNames": [
          ""
        ],
        "required": "true",
        "admin_question": false,
        "tag": "radio",
        "setType": "optionSet",
        "survey": "null",
        "order": "1",
        "tab": "",
        "dependentQuestion": "",
        "dependentOption": "",
        "temp_id": "control_1"
      },
      {
        "type": "checkbox",
        "text": "Where have you seen the ad of  __________? ",
        "choices": [
          "Facebook / Instagram / Youtube",
          "Online ads at other websites",
          "Saw an ad while searching",
          "TV ad",
          "Newspaper ad",
          "Magazine ad",
          "Radio ad",
          "Hoarding on the road",
          "Promotional material in shops"
        ],
        "tabNames": [
          ""
        ],
        "required": "true",
        "tag": "checkbox",
        "setType": "optionSet",
        "survey": "null",
        "order": "1",
        "tab": "",
        "dependentQuestion": "",
        "dependentOption": ""
      },
      {
        "type": "radio",
        "text": "Do you remember the ad that you saw of_____________?",
        "choices": [
          "Yes",
          "No"
        ],
        "tabNames": [
          "",
          ""
        ],
        "required": "true",
        "tag": "radio",
        "setType": "optionSet",
        "survey": "null",
        "order": "1",
        "tab": "",
        "dependentQuestion": "",
        "dependentOption": ""
      },
      {
        "type": "checkbox",
        "text": "If yes, what do remember of the ad on TV/online video?",
        "choices": [
          "Bits and pieces",
          "First half",
          "Middle part",
          "Last part of the ad",
          "The music / Jingle",
          "The brand ambassador",
          "The characters",
          "The tagline"
        ],
        "tabNames": [
          ""
        ],
        "required": "true",
        "tag": "checkbox",
        "setType": "optionSet",
        "survey": "null",
        "order": "1",
        "tab": "",
        "dependentQuestion": "2",
        "dependentOption": "Yes"
      },
      {
        "type": "radio",
        "text": "Did you like the advertisement the brand has created on TV?",
        "choices": [
          "Loved it",
          "Quite like it",
          "Ok with it",
          "Don't like it as much",
          "Don't like it at all"
        ],
        "tabNames": [
          "",
          "",
          "",
          "",
          ""
        ],
        "required": "true",
        "tag": "radio",
        "setType": "optionSet",
        "survey": "null",
        "order": "1",
        "tab": "",
        "dependentQuestion": "2",
        "dependentOption": "Yes"
      },
      {
        "type": "radio",
        "text": "Did you like the advertisement the brand has created on Print?",
        "choices": [
          "Loved it",
          "Quite like it",
          "Ok with it",
          "Don't like it as much",
          "Don't like it at all"
        ],
        "tabNames": [
          "",
          "",
          "",
          "",
          ""
        ],
        "required": "true",
        "tag": "radio",
        "setType": "optionSet",
        "survey": "null",
        "order": "1",
        "tab": "",
        "dependentQuestion": "2",
        "dependentOption": "Yes"
      },
      {
        "type": "radio",
        "text": "Did you like the advertisement the brand has created for online in video format?",
        "choices": [
          "Loved it",
          "Quite like it",
          "Ok with it",
          "Don't like it as much",
          "Don't like it at all"
        ],
        "tabNames": [
          "",
          "",
          "",
          "",
          ""
        ],
        "required": "true",
        "tag": "radio",
        "setType": "optionSet",
        "survey": "null",
        "order": "1",
        "tab": "",
        "dependentQuestion": "2",
        "dependentOption": "Yes"
      },
      {
        "type": "radio",
        "text": "Did you like the advertisement the brand has created in display format?",
        "choices": [
          "Loved it",
          "Quite like it",
          "Ok with it",
          "Don't like it as much",
          "Don't like it at all"
        ],
        "tabNames": [
          "",
          "",
          "",
          "",
          ""
        ],
        "required": "true",
        "tag": "radio",
        "setType": "optionSet",
        "survey": "null",
        "order": "1",
        "tab": "",
        "dependentQuestion": "2",
        "dependentOption": "Yes"
      },
      {
        "type": "radio",
        "text": "Did you like the advertisement the brand has created for outdoor hoarding?",
        "choices": [
          "Loved it",
          "Quite like it",
          "Ok with it",
          "Don't like it as much",
          "Don't like it at all"
        ],
        "tabNames": [
          "",
          "",
          "",
          "",
          ""
        ],
        "required": "true",
        "tag": "radio",
        "setType": "optionSet",
        "survey": "null",
        "order": "1",
        "tab": "",
        "dependentQuestion": "2",
        "dependentOption": "Yes"
      },
      {
        "type": "checkbox",
        "text": "Which creative advertisement did you think was most memorable/compelling/you liked most?",
        "choices": [
          "Creative A description",
          "Creative B description",
          "reative C description",
          "reative D description"
        ],
        "tabNames": [
          ""
        ],
        "required": "true",
        "tag": "checkbox",
        "setType": "optionSet",
        "survey": "null",
        "order": "1",
        "tab": "",
        "dependentQuestion": "2",
        "dependentOption": "Yes"
      },
      {
        "type": "radio",
        "text": "How often have you seen _____________[our brand name] ad compared to the ad of ______________[competition brand name]?",
        "choices": [
          "Much more than competition",
          "Little more than competition",
          "As much as competition",
          "Less than competition",
          "Much less than competition"
        ],
        "tabNames": [
          "",
          "",
          "",
          "",
          ""
        ],
        "required": "true",
        "tag": "radio",
        "setType": "optionSet",
        "survey": "null",
        "order": "1",
        "tab": "",
        "dependentQuestion": "2",
        "dependentOption": "Yes"
      },
      {
        "type": "checkbox",
        "text": "Please look at the statements below and attribute the event to the corresponding brand ad",
        "choices": [
          "Situation A in the ad our/ competition ad\t___[Our brand name]\t___[Competition brand name]",
          "Situation B in the ad our/ competition ad\t___[Our brand name]\t___[Competition brand name]",
          "Situation C in the ad our/ competition ad\t___[Our brand name]\t___[Competition brand name]",
          "Situation D in the ad our/ competition ad\t___[Our brand name]\t___[Competition brand name]"
        ],
        "tabNames": [
          ""
        ],
        "required": "true",
        "tag": "checkbox",
        "setType": "optionSet",
        "survey": "null",
        "order": "1",
        "tab": "",
        "dependentQuestion": "2",
        "dependentOption": "Yes"
      }
    ],
    "tabs": [
      {
        "questions": [
          {
            "type": "checkbox",
            "text": "Where have you seen the ad of  __________? ",
            "choices": [
              "Facebook / Instagram / Youtube",
              "Online ads at other websites",
              "Saw an ad while searching",
              "TV ad",
              "Newspaper ad",
              "Magazine ad",
              "Radio ad",
              "Hoarding on the road",
              "Promotional material in shops"
            ],
            "tabNames": [
              ""
            ],
            "required": "true",
            "tag": "checkbox",
            "setType": "optionSet",
            "survey": "null",
            "order": "1",
            "tab": "",
            "dependentQuestion": "",
            "dependentOption": ""
          },
          {
            "type": "radio",
            "text": "Do you remember the ad that you saw of_____________?",
            "choices": [
              "Yes",
              "No"
            ],
            "tabNames": [
              "",
              ""
            ],
            "required": "true",
            "tag": "radio",
            "setType": "optionSet",
            "survey": "null",
            "order": "1",
            "tab": "",
            "dependentQuestion": "",
            "dependentOption": ""
          },
          {
            "type": "checkbox",
            "text": "If yes, what do remember of the ad on TV/online video?",
            "choices": [
              "Bits and pieces",
              "First half",
              "Middle part",
              "Last part of the ad",
              "The music / Jingle",
              "The brand ambassador",
              "The characters",
              "The tagline"
            ],
            "tabNames": [
              ""
            ],
            "required": "true",
            "tag": "checkbox",
            "setType": "optionSet",
            "survey": "null",
            "order": "1",
            "tab": "",
            "dependentQuestion": "2",
            "dependentOption": "Yes"
          },
          {
            "type": "radio",
            "text": "Did you like the advertisement the brand has created on TV?",
            "choices": [
              "Loved it",
              "Quite like it",
              "Ok with it",
              "Don't like it as much",
              "Don't like it at all"
            ],
            "tabNames": [
              "",
              "",
              "",
              "",
              ""
            ],
            "required": "true",
            "tag": "radio",
            "setType": "optionSet",
            "survey": "null",
            "order": "1",
            "tab": "",
            "dependentQuestion": "2",
            "dependentOption": "Yes"
          },
          {
            "type": "radio",
            "text": "Did you like the advertisement the brand has created on Print?",
            "choices": [
              "Loved it",
              "Quite like it",
              "Ok with it",
              "Don't like it as much",
              "Don't like it at all"
            ],
            "tabNames": [
              "",
              "",
              "",
              "",
              ""
            ],
            "required": "true",
            "tag": "radio",
            "setType": "optionSet",
            "survey": "null",
            "order": "1",
            "tab": "",
            "dependentQuestion": "2",
            "dependentOption": "Yes"
          },
          {
            "type": "radio",
            "text": "Did you like the advertisement the brand has created for online in video format?",
            "choices": [
              "Loved it",
              "Quite like it",
              "Ok with it",
              "Don't like it as much",
              "Don't like it at all"
            ],
            "tabNames": [
              "",
              "",
              "",
              "",
              ""
            ],
            "required": "true",
            "tag": "radio",
            "setType": "optionSet",
            "survey": "null",
            "order": "1",
            "tab": "",
            "dependentQuestion": "2",
            "dependentOption": "Yes"
          },
          {
            "type": "radio",
            "text": "Did you like the advertisement the brand has created in display format?",
            "choices": [
              "Loved it",
              "Quite like it",
              "Ok with it",
              "Don't like it as much",
              "Don't like it at all"
            ],
            "tabNames": [
              "",
              "",
              "",
              "",
              ""
            ],
            "required": "true",
            "tag": "radio",
            "setType": "optionSet",
            "survey": "null",
            "order": "1",
            "tab": "",
            "dependentQuestion": "2",
            "dependentOption": "Yes"
          },
          {
            "type": "radio",
            "text": "Did you like the advertisement the brand has created for outdoor hoarding?",
            "choices": [
              "Loved it",
              "Quite like it",
              "Ok with it",
              "Don't like it as much",
              "Don't like it at all"
            ],
            "tabNames": [
              "",
              "",
              "",
              "",
              ""
            ],
            "required": "true",
            "tag": "radio",
            "setType": "optionSet",
            "survey": "null",
            "order": "1",
            "tab": "",
            "dependentQuestion": "2",
            "dependentOption": "Yes"
          },
          {
            "type": "checkbox",
            "text": "Which creative advertisement did you think was most memorable/compelling/you liked most?",
            "choices": [
              "Creative A description",
              "Creative B description",
              "reative C description",
              "reative D description"
            ],
            "tabNames": [
              ""
            ],
            "required": "true",
            "tag": "checkbox",
            "setType": "optionSet",
            "survey": "null",
            "order": "1",
            "tab": "",
            "dependentQuestion": "2",
            "dependentOption": "Yes"
          },
          {
            "type": "radio",
            "text": "How often have you seen _____________[our brand name] ad compared to the ad of ______________[competition brand name]?",
            "choices": [
              "Much more than competition",
              "Little more than competition",
              "As much as competition",
              "Less than competition",
              "Much less than competition"
            ],
            "tabNames": [
              "",
              "",
              "",
              "",
              ""
            ],
            "required": "true",
            "tag": "radio",
            "setType": "optionSet",
            "survey": "null",
            "order": "1",
            "tab": "",
            "dependentQuestion": "2",
            "dependentOption": "Yes"
          },
          {
            "type": "checkbox",
            "text": "Please look at the statements below and attribute the event to the corresponding brand ad",
            "choices": [
              "Situation A in the ad our/ competition ad\t___[Our brand name]\t___[Competition brand name]",
              "Situation B in the ad our/ competition ad\t___[Our brand name]\t___[Competition brand name]",
              "Situation C in the ad our/ competition ad\t___[Our brand name]\t___[Competition brand name]",
              "Situation D in the ad our/ competition ad\t___[Our brand name]\t___[Competition brand name]"
            ],
            "tabNames": [
              ""
            ],
            "required": "true",
            "tag": "checkbox",
            "setType": "optionSet",
            "survey": "null",
            "order": "1",
            "tab": "",
            "dependentQuestion": "2",
            "dependentOption": "Yes"
          }
        ]
      }
    ]
  },
  competition: {
    "creator": "1",
    "name": "Competition Survey",
    "description": "Template",
    // "isPublished": "False",
    "needLoggedUser": "False",
    "displayByQuestion": "False",
    "surveyQuestions": [
      {
        "type": "radio",
        "text": "How important is ____________ (name a solution instead of a product) in your current lifestyle?",
        "choices": [
          "Very Important",
          "Quite important",
          "Not sure",
          "Not so important",
          "Not important at all"
        ],
        "tabNames": [
          "",
          "",
          "",
          "",
          ""
        ],
        "required": "true",
        "admin_question": false,
        "tag": "radio",
        "setType": "optionSet",
        "survey": "null",
        "order": "1",
        "tab": "",
        "dependentQuestion": "",
        "dependentOption": "",
        "temp_id": "control_1"
      },
      {
        "type": "radio",
        "text": "How often do you need help on ______________ (name solution instead of product) in your regular life?",
        "choices": [
          "2 times a day",
          "Once a day",
          "Few times a week",
          "Once a week",
          "Few times a month",
          "Once a month",
          "Few times in 6 moths",
          "Once in 6 months",
          "Few times a year",
          "Once a year",
          "Few times in 3-4 years",
          "Once in 3-4 years"
        ],
        "tabNames": [
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          ""
        ],
        "required": "true",
        "admin_question": false,
        "tag": "radio",
        "setType": "optionSet",
        "survey": "null",
        "order": "1",
        "tab": "",
        "dependentQuestion": "",
        "dependentOption": "",
        "temp_id": "control_2"
      },
      {
        "type": "radio",
        "text": "Are you happy with the current solution available for ____________ (name solution instead of product)",
        "choices": [
          "Yes",
          "No"
        ],
        "tabNames": [
          "",
          ""
        ],
        "required": "true",
        "admin_question": false,
        "tag": "radio",
        "setType": "optionSet",
        "survey": "null",
        "order": "1",
        "tab": "",
        "dependentQuestion": "",
        "dependentOption": "",
        "temp_id": "control_3"
      },
      {
        "type": "radio",
        "text": "Which is the brand that you prefer to use currently?",
        "choices": [
          "___",
          "___"
        ],
        "tabNames": [
          "",
          ""
        ],
        "required": "true",
        "admin_question": false,
        "tag": "radio",
        "setType": "optionSet",
        "survey": "null",
        "order": "1",
        "tab": "",
        "dependentQuestion": "",
        "dependentOption": "",
        "temp_id": "control_4"
      },
      {
        "type": "checkbox",
        "text": "What are the issues associated with the current product that you would like a solution for?",
        "choices": [
          "Doesn’t really solve your problem",
          "It is not value for money",
          "Product quality is poor",
          "Not available in the market when you looked for it",
          "Does not match my personality",
          "Quantity is not adequate",
          "Not sure if I really need it"
        ],
        "tabNames": [
          ""
        ],
        "required": "true",
        "admin_question": false,
        "tag": "checkbox",
        "setType": "optionSet",
        "survey": "null",
        "order": "1",
        "tab": "",
        "dependentQuestion": "3",
        "dependentOption": "No",
        "temp_id": "control_5"
      },
      {
        "type": "radio",
        "text": "If there is a product in the market that takes care of ______________ & _________, would you be interested in trying it?",
        "choices": [
          "Absolutely",
          "May try",
          "Not sure",
          "May not try",
          "Won't try"
        ],
        "tabNames": [
          "",
          "",
          "",
          "",
          ""
        ],
        "required": "true",
        "admin_question": false,
        "tag": "radio",
        "setType": "optionSet",
        "survey": "null",
        "order": "1",
        "tab": "",
        "dependentQuestion": "",
        "dependentOption": "",
        "temp_id": "control_6"
      },
      {
        "type": "radio",
        "text": "How much would you be willing to pay for the product than what is available in the market?",
        "choices": [
          "Rs _",
          "Rs _"
        ],
        "tabNames": [
          "",
          ""
        ],
        "required": "true",
        "admin_question": false,
        "tag": "radio",
        "setType": "optionSet",
        "survey": "null",
        "order": "1",
        "tab": "",
        "dependentQuestion": "",
        "dependentOption": "",
        "temp_id": "control_7"
      },
      {
        "type": "radio",
        "text": "Would you like to avail of an online or offline service of service for the product?",
        "choices": [
          "Online",
          "Offline",
          "Both"
        ],
        "tabNames": [
          "",
          "",
          ""
        ],
        "required": "true",
        "admin_question": false,
        "tag": "radio",
        "setType": "optionSet",
        "survey": "null",
        "order": "1",
        "tab": "",
        "dependentQuestion": "",
        "dependentOption": "",
        "temp_id": "control_8"
      },
      {
        "type": "radio",
        "text": "Would you prefer to download an app for the product or is it better to have a website (WAP enabled)? ",
        "choices": [
          "Download app",
          "Website (WAP Enabled)"
        ],
        "tabNames": [
          "",
          ""
        ],
        "required": "true",
        "admin_question": false,
        "tag": "radio",
        "setType": "optionSet",
        "survey": "null",
        "order": "1",
        "tab": "",
        "dependentQuestion": "8",
        "dependentOption": "Online@@@Both",
        "temp_id": "control_9"
      },
      {
        "type": "radio",
        "text": "Do you want the product to be available in more places?",
        "choices": [
          "__",
          "__"
        ],
        "tabNames": [
          "",
          ""
        ],
        "required": "true",
        "admin_question": false,
        "tag": "radio",
        "setType": "optionSet",
        "survey": "null",
        "order": "1",
        "tab": "",
        "dependentQuestion": "8",
        "dependentOption": "Offline@@@Both",
        "temp_id": "control_10"
      },
      {
        "type": "radio",
        "text": "Is smart functionality of the product as important as how it reflects on your personality? ",
        "choices": [
          "Functionality is what matter",
          "Functionality is important but can’t forget how it reflects on me",
          "Functionality & reflection on personality are equally important",
          "How it reflects on me is important but can’t forget functionality",
          "How it reflects on my personality is what matter"
        ],
        "tabNames": [
          "",
          "",
          "",
          "",
          ""
        ],
        "required": "true",
        "admin_question": false,
        "tag": "radio",
        "setType": "optionSet",
        "survey": "null",
        "order": "1",
        "tab": "",
        "dependentQuestion": "",
        "dependentOption": "",
        "temp_id": "control_11"
      }
    ],
    "tabs": [
      {
        "questions": [
          {
            "type": "para",
            "name": "",
            "text": "",
            "required": "true",
            "placeholder": "",
            "max": "200",
            "min": "0",
            "tag": "para",
            "setType": "textSet",
            "tab": "",
            "dependentQuestion": "",
            "dependentOption": ""
          }
        ],
        "end": false
      }
    ]
  }
};
