export const templates = {
  custom: [{
    'id': 1,
    'key': 'age',
    'text': 'What is your age ?',
    'type': 'checkbox',
    'choices': [{
      'name': '15-18',
      'value': '15-18'
    }, {
      'name': '19-24',
      'value': '19-24'
    }, {
      'name': '25-34',
      'value': '25-34'
    }, {
      'name': '35-44',
      'value': '35-44'
    }, {
      'name': '45+',
      'value': '45+'
    }]
  }, {
    'id': 2,
    'key': 'gender',
    'text': 'Gender ?',
    'type': 'checkbox',
    'choices': [{
      'name': 'Male',
      'value': 'male'
    }, {
      'name': 'Female',
      'value': 'female'
    }, {
      'name': 'Neutral',
      'value': 'neutral'
    }]
  }, {
    'id': 3,
    'key': 'nccs',
    'text': 'NCCS (New consumer classification system basis education & product ownership at home)',
    'type': 'checkbox',
    'choices': [{
      'name': 'NCCS A  _A1  _A2  _A3',
      'value': 'NCCS A  _A1  _A2  _A3'
    }, {
      'name': 'NCCS B  _B1  _B2',
      'value': 'NCCS B  _B1  _B2'
    }, {
      'name': 'NCCS C  _C1  _C2',
      'value': 'NCCS C  _C1  _C2'
    }, {
      'name': 'NCCS D  _D1  _D2',
      'value': 'NCCS D  _D1  _D2'
    }, {
      'name': 'NCCS E  _E1  _E2  _E3',
      'value': 'NCCS E  _E1  _E2  _E3'
    }]
  }, {
    'id': 4,
    'key': 'details',
    'type': 'short',
    'text': 'Please describe the target audience briefly beyond the information ' +
    'provided earlier (this information is critical to sharpening our targeting for ' +
    'respondents who are representation of the target audience) (max 300 words)',
    'placeholder': 'Share information on what kind of lifestyle they lead, what drives them, ' +
    'what do they believe in, what need are they trying to solve etc',
  }],
  brand: [{
    'id': 1,
    'key': 'age',
    'text': 'What is your age ?',
    'type': 'checkbox',
    'choices': [{
      'name': '15-18',
      'value': '15-18'
    }, {
      'name': '19-24',
      'value': '19-24'
    }, {
      'name': '25-34',
      'value': '25-34'
    }, {
      'name': '35-44',
      'value': '35-44'
    }, {
      'name': '45+',
      'value': '45+'
    }]
  }, {
    'id': 2,
    'key': 'gender',
    'text': 'Gender ?',
    'type': 'checkbox',
    'choices': [{
      'name': 'Male',
      'value': 'male'
    }, {
      'name': 'Female',
      'value': 'female'
    }, {
      'name': 'Neutral',
      'value': 'neutral'
    }]
  }, {
    'id': 3,
    'key': 'nccs',
    'text': 'NCCS (New consumer classification system basis education & product ownership at home)',
    'type': 'checkbox',
    'choices': [{
      'name': 'NCCS A  _A1  _A2  _A3',
      'value': 'NCCS A  _A1  _A2  _A3'
    }, {
      'name': 'NCCS B  _B1  _B2',
      'value': 'NCCS B  _B1  _B2'
    }, {
      'name': 'NCCS C  _C1  _C2',
      'value': 'NCCS C  _C1  _C2'
    }, {
      'name': 'NCCS D  _D1  _D2',
      'value': 'NCCS D  _D1  _D2'
    }, {
      'name': 'NCCS E  _E1  _E2  _E3',
      'value': 'NCCS E  _E1  _E2  _E3'
    }]
  }, {
    'id': 4,
    'key': 'details',
    'type': 'short',
    'text': 'Please describe the target audience briefly beyond the information ' +
    'provided earlier (this information is critical to sharpening our targeting for ' +
    'respondents who are representation of the target audience) (max 300 words)',
    'placeholder': 'Share information on what kind of lifestyle they lead, what drives them, ' +
    'what do they believe in, what need are they trying to solve etc',
  }, {
    'id': 5,
    'key': 'report',
    'text': 'Do you want month end report ?',
    'type': 'radio',
    'choices': [{
      'name': 'Yes',
      'value': 'yes'
    }, {
      'name': 'No',
      'value': 'no'
    }]
  }, {
    'id': 6,
    'key': 'reportBrand',
    'dependent': 'report',
    'dependentValue': ['yes'],
    'text': 'When do the brand come into being ?',
    'type': 'radio',
    'choices': [{
      'name': 'Within a Year',
      'value': 'within a year'
    }, {
      'name': '2-3 Years',
      'value': '2-3'
    }, {
      'name': '3-5 Years',
      'value': '3-5'
    }, {
      'name': '5+ Years',
      'value': '5+'
    }]
  }, {
    'id': 7,
    'key': 'reportAssociated',
    'dependent': 'report',
    'dependentValue': ['yes'],
    'text': 'Has the product associated is as old as the brand itself ?',
    'type': 'radio',
    'choices': [{
      'name': 'Yes',
      'value': 'yes'
    }, {
      'name': 'No',
      'value': 'no'
    }]
  }, {
    'id': 8,
    'key': 'reportCategory',
    'dependent': 'report',
    'dependentValue': ['yes'],
    'text': 'What is the position of the brand in the category it is in ?',
    'type': 'radio',
    'choices': [{
      'name': 'Leader',
      'value': 'leader'
    }, {
      'name': 'Close Challenger',
      'value': 'Close Challenger'
    }, {
      'name': 'Distant Challenger',
      'value': 'Distant Challenger'
    }, {
      'name': 'One of the many Challengers',
      'value': 'One of the many Challengers'
    }, {
      'name': 'None of the above',
      'value': 'None of the above'
    }]
  }, {
    'id': 9,
    'key': 'reportNewCategory',
    'dependent': 'reportCategory',
    'dependentValue': ['None of the above'],
    'text': 'If none of the above, is the brand in a completely new category, which means it is a product innovation ?',
    'type': 'radio',
    'choices': [{
      'name': 'Yes',
      'value': 'yes'
    }, {
      'name': 'No',
      'value': 'no'
    }]
  }, {
    'id': 10,
    'key': 'reportNew',
    'dependent': 'reportNewCategory',
    'dependentValue': ['no'],
    'text': 'If no, is the new brand primarily in new format / innovative packaging ?',
    'type': 'radio',
    'choices': [{
      'name': 'Yes',
      'value': 'yes'
    }, {
      'name': 'No',
      'value': 'no'
    }]
  }, {
    'id': 11,
    'key': 'reportNew2',
    'text': 'Is the new product/brand in a niche audience segment and not in the mass segment ?',
    'type': 'radio',
    'choices': [{
      'name': 'Yes',
      'value': 'yes'
    }, {
      'name': 'No',
      'value': 'no'
    }]
  }, {
    'id': 12,
    'key': 'reportConcerns',
    'text': 'What are the concerns around the brand ?',
    'type': 'checkbox',
    'choices': [{
      'name': 'Low Brand Awareness',
      'value': 'Low Brand Awareness'
    }, {
      'name': 'High Competition Pressure',
      'value': 'High Competition Pressure'
    }, {
      'name': 'Low repeat trials for the brand',
      'value': 'Low repeat trials for the brand'
    }, {
      'name': 'Brand needs to help create a new category',
      'value': 'Brand needs to help create a new category'
    }, {
      'name': 'Communicate additional advantages of product / services',
      'value': 'Communicate additional advantages of product / services'
    }]
  }],
  communication: [{
    'id': 1,
    'key': 'age',
    'text': 'What is your age ?',
    'type': 'checkbox',
    'choices': [{
      'name': '15-18',
      'value': '15-18'
    }, {
      'name': '19-24',
      'value': '19-24'
    }, {
      'name': '25-34',
      'value': '25-34'
    }, {
      'name': '35-44',
      'value': '35-44'
    }, {
      'name': '45+',
      'value': '45+'
    }]
  }, {
    'id': 2,
    'key': 'gender',
    'text': 'Gender ?',
    'type': 'checkbox',
    'choices': [{
      'name': 'Male',
      'value': 'male'
    }, {
      'name': 'Female',
      'value': 'female'
    }, {
      'name': 'Neutral',
      'value': 'neutral'
    }]
  }, {
    'id': 3,
    'key': 'nccs',
    'text': 'NCCS (New consumer classification system basis education & product ownership at home)',
    'type': 'checkbox',
    'choices': [{
      'name': 'NCCS A  _A1  _A2  _A3',
      'value': 'NCCS A  _A1  _A2  _A3'
    }, {
      'name': 'NCCS B  _B1  _B2',
      'value': 'NCCS B  _B1  _B2'
    }, {
      'name': 'NCCS C  _C1  _C2',
      'value': 'NCCS C  _C1  _C2'
    }, {
      'name': 'NCCS D  _D1  _D2',
      'value': 'NCCS D  _D1  _D2'
    }, {
      'name': 'NCCS E  _E1  _E2  _E3',
      'value': 'NCCS E  _E1  _E2  _E3'
    }]
  }, {
    'id': 4,
    'key': 'details',
    'type': 'short',
    'text': 'Please describe the target audience briefly beyond the information ' +
    'provided earlier (this information is critical to sharpening our targeting for ' +
    'respondents who are representation of the target audience) (max 300 words)',
    'placeholder': 'Share information on what kind of lifestyle they lead, what drives them, ' +
    'what do they believe in, what need are they trying to solve etc',
  }, {
    'id': 5,
    'key': 'report',
    'text': 'Do you want month end report ?',
    'type': 'radio',
    'choices': [{
      'name': 'Yes',
      'value': 'yes'
    }, {
      'name': 'No',
      'value': 'no'
    }]
  }, {
    'id': 6,
    'key': 'c6',
    'text': 'Is this communication completely new for the consumer ?',
    'dependent': 'report',
    'dependentValue': ['yes'],
    'type': 'radio',
    'choices': [{
      'name': 'Yes',
      'value': 'yes'
    }, {
      'name': 'No',
      'value': 'no'
    }]
  }, {
    'id': 7,
    'key': 'c7',
    'text': 'Has the brand name been used in the past ?',
    'dependent': 'report',
    'dependentValue': ['yes'],
    'type': 'radio',
    'choices': [{
      'name': 'Yes',
      'value': 'yes'
    }, {
      'name': 'No',
      'value': 'no'
    }]
  }, {
    'id': 8,
    'key': 'c8',
    'text': 'If used, which category was it used in ?',
    'dependent': 'c7',
    'dependentValue': ['yes'],
    'type': 'short',
  }, {
    'id': 8,
    'key': 'c8',
    'text': 'Is the product in a completely new category, which means it is a product innovation ?',
    'dependent': 'report',
    'dependentValue': ['yes'],
    'type': 'radio',
    'choices': [{
      'name': 'Yes',
      'value': 'yes'
    }, {
      'name': 'No',
      'value': 'no'
    }]
  }, {
    'id': 9,
    'key': 'c9',
    'text': 'If no, is the new product primarily in new format / innovative packaging ?',
    'dependent': 'c8',
    'dependentValue': ['no'],
    'type': 'radio',
    'choices': [{
      'name': 'Yes',
      'value': 'yes'
    }, {
      'name': 'No',
      'value': 'no'
    }]
  }, {
    'id': 10,
    'key': 'c10',
    'text': 'Is the new product in a niche audience segment and not in the mass segment ?',
    'dependent': 'report',
    'dependentValue': ['yes'],
    'type': 'radio',
    'choices': [{
      'name': 'Yes',
      'value': 'yes'
    }, {
      'name': 'No',
      'value': 'no'
    }]
  }, {
    'id': 11,
    'key': 'c11',
    'text': 'What is the purpose of the communication ?',
    'dependent': 'report',
    'dependentValue': ['yes'],
    'type': 'checkbox',
    'choices': [{
      'name': 'Create Awareness',
      'value': 'Create Awareness'
    }, {
      'name': 'Challenge Compeittion',
      'value': 'Challenge Competition'
    }, {
      'name': 'Create disruption in the category',
      'value': 'Create disruption in the category'
    }, {
      'name': 'Help create a new category',
      'value': 'Help create a new category'
    }, {
      'name': 'Communicate additional advantages of product / service',
      value: 'Communicate additional advantages of product / service'
    }]
  }],
  product: [{
    'id': 1,
    'key': 'age',
    'text': 'What is your age ?',
    'type': 'checkbox',
    'choices': [{
      'name': '15-18',
      'value': '15-18'
    }, {
      'name': '19-24',
      'value': '19-24'
    }, {
      'name': '25-34',
      'value': '25-34'
    }, {
      'name': '35-44',
      'value': '35-44'
    }, {
      'name': '45+',
      'value': '45+'
    }]
  }, {
    'id': 2,
    'key': 'gender',
    'text': 'Gender ?',
    'type': 'checkbox',
    'choices': [{
      'name': 'Male',
      'value': 'male'
    }, {
      'name': 'Female',
      'value': 'female'
    }, {
      'name': 'Neutral',
      'value': 'neutral'
    }]
  }, {
    'id': 3,
    'key': 'nccs',
    'text': 'NCCS (New consumer classification system basis education & product ownership at home)',
    'type': 'checkbox',
    'choices': [{
      'name': 'NCCS A  _A1  _A2  _A3',
      'value': 'NCCS A  _A1  _A2  _A3'
    }, {
      'name': 'NCCS B  _B1  _B2',
      'value': 'NCCS B  _B1  _B2'
    }, {
      'name': 'NCCS C  _C1  _C2',
      'value': 'NCCS C  _C1  _C2'
    }, {
      'name': 'NCCS D  _D1  _D2',
      'value': 'NCCS D  _D1  _D2'
    }, {
      'name': 'NCCS E  _E1  _E2  _E3',
      'value': 'NCCS E  _E1  _E2  _E3'
    }]
  }, {
    'id': 4,
    'key': 'details',
    'type': 'short',
    'text': 'Please describe the target audience briefly beyond the information ' +
    'provided earlier (this information is critical to sharpening our targeting for ' +
    'respondents who are representation of the target audience) (max 300 words)',
    'placeholder': 'Share information on what kind of lifestyle they lead, what drives them, ' +
    'what do they believe in, what need are they trying to solve etc',
  }, {
    'id': 5,
    'key': 'report',
    'text': 'Do you want month end report ?',
    'type': 'radio',
    'choices': [{
      'name': 'Yes',
      'value': 'yes'
    }, {
      'name': 'No',
      'value': 'no'
    }]
  }, {
    'id': 6,
    'key': 'c6',
    'text': 'Is this product completely new in the consumer space ?',
    'dependent': 'report',
    'dependentValue': ['yes'],
    'type': 'radio',
    'choices': [{
      'name': 'Yes',
      'value': 'yes'
    }, {
      'name': 'No',
      'value': 'no'
    }]
  }, {
    'id': 7,
    'key': 'c7',
    'text': 'Has the brand name been used in the past ?',
    'dependent': 'report',
    'dependentValue': ['yes'],
    'type': 'radio',
    'choices': [{
      'name': 'Yes',
      'value': 'yes'
    }, {
      'name': 'No',
      'value': 'no'
    }]
  }, {
    'id': 8,
    'key': 'c8',
    'dependent': 'c7',
    'dependentValue': ['yes'],
    'type': 'short',
    'text': 'If used, which category was it used ?'
  }, {
    'id': 8,
    'key': 'c8',
    'text': 'Is the product in a completely new category, which means it is a product innovation ?',
    'dependent': 'report',
    'dependentValue': ['yes'],
    'type': 'radio',
    'choices': [{
      'name': 'Yes',
      'value': 'yes'
    }, {
      'name': 'No',
      'value': 'no'
    }]
  }, {
    'id': 9,
    'key': 'c9',
    'text': 'If no, is the new product primarily in new format / innovative packaging ?',
    'dependent': 'c8',
    'dependentValue': ['no'],
    'type': 'radio',
    'choices': [{
      'name': 'Yes',
      'value': 'yes'
    }, {
      'name': 'No',
      'value': 'no'
    }]
  }, {
    'id': 10,
    'key': 'c10',
    'text': 'Is the new product in a niche audience segment and not in the mass segment ?',
    'dependent': 'report',
    'dependentValue': ['yes'],
    'type': 'radio',
    'choices': [{
      'name': 'Yes',
      'value': 'yes'
    }, {
      'name': 'No',
      'value': 'no'
    }]
  }],
  competition: [{
    'id': 1,
    'key': 'age',
    'text': 'What is your age ?',
    'type': 'checkbox',
    'choices': [{
      'name': '15-18',
      'value': '15-18'
    }, {
      'name': '19-24',
      'value': '19-24'
    }, {
      'name': '25-34',
      'value': '25-34'
    }, {
      'name': '35-44',
      'value': '35-44'
    }, {
      'name': '45+',
      'value': '45+'
    }]
  }, {
    'id': 2,
    'key': 'gender',
    'text': 'Gender ?',
    'type': 'checkbox',
    'choices': [{
      'name': 'Male',
      'value': 'male'
    }, {
      'name': 'Female',
      'value': 'female'
    }, {
      'name': 'Neutral',
      'value': 'neutral'
    }]
  }, {
    'id': 3,
    'key': 'nccs',
    'text': 'NCCS (New consumer classification system basis education & product ownership at home)',
    'type': 'checkbox',
    'choices': [{
      'name': 'NCCS A  _A1  _A2  _A3',
      'value': 'NCCS A  _A1  _A2  _A3'
    }, {
      'name': 'NCCS B  _B1  _B2',
      'value': 'NCCS B  _B1  _B2'
    }, {
      'name': 'NCCS C  _C1  _C2',
      'value': 'NCCS C  _C1  _C2'
    }, {
      'name': 'NCCS D  _D1  _D2',
      'value': 'NCCS D  _D1  _D2'
    }, {
      'name': 'NCCS E  _E1  _E2  _E3',
      'value': 'NCCS E  _E1  _E2  _E3'
    }]
  }, {
    'id': 4,
    'key': 'details',
    'type': 'short',
    'text': 'Please describe the target audience briefly beyond the information ' +
    'provided earlier (this information is critical to sharpening our targeting for ' +
    'respondents who are representation of the target audience) (max 300 words)',
    'placeholder': 'Share information on what kind of lifestyle they lead, what drives them, ' +
    'what do they believe in, what need are they trying to solve etc',
  }, {
    'id': 5,
    'key': 'report',
    'text': 'Do you want month end report ?',
    'type': 'radio',
    'choices': [{
      'name': 'Yes',
      'value': 'yes'
    }, {
      'name': 'No',
      'value': 'no'
    }]
  }, {
    'id': 6,
    'key': 'c6',
    'text': 'Is this product/service an innovation which mean nothing like this is available in the market place for the existing need that other products/services are available for ?',
    'dependent': 'report',
    'dependentValue': ['yes'],
    'type': 'radio',
    'choices': [{
      'name': 'Yes',
      'value': 'yes'
    }, {
      'name': 'No',
      'value': 'no'
    }]
  }, {
    'id': 7,
    'key': 'c7',
    'text': 'If no, does the product/service intend to be far superior than the existing options available in the market ?',
    'dependent': 'report',
    'dependentValue': ['yes'],
    'type': 'radio',
    'choices': [{
      'name': 'Yes',
      'value': 'yes'
    }, {
      'name': 'No',
      'value': 'no'
    }]
  }, {
    'id': 8,
    'key': 'c8',
    'text': 'Is the product/service going to reach the customer in a unique way which different the conventional way the category operates ?',
    'dependent': 'report',
    'dependentValue': ['yes'],
    'type': 'radio',
    'choices': [{
      'name': 'Yes',
      'value': 'yes'
    }, {
      'name': 'No',
      'value': 'no'
    }]
  }, {
    'id': 9,
    'key': 'c9',
    'text': 'Are there distinct advantages of the product/service over competition ?',
    'dependent': 'report',
    'dependentValue': ['yes'],
    'type': 'checkbox',
    'choices': [{
      'name': 'Much more efficiently priced',
      'value': 'Much more efficiently priced'
    }, {
      'name': 'Follows a much better process of delivery to the customer',
      'value': 'Follows a much better process of delivery to the customer'
    }, {
      'name': 'Able to manage far better quality than existing competition',
      'value': 'Able to manage far better quality than existing competition',
    }, {
      'name': 'Far more responsible to the environment',
      'value': 'Far more responsible to the environment',
    }, {
      'name': 'Continuous innovation',
      'value': 'Continuous innovation',
    }]
  }, {
    'id': 10,
    'key': 'c10',
    'text': 'When are you planning to launch the product/service in the consumer domain ?',
    'dependent': 'report',
    'dependentValue': ['yes'],
    'type': 'radio',
    'choices': [{
      'name': 'Within next 3 months',
      'value': 'Within next 3 months'
    }, {
      'name': 'Next 3 to 6 months',
      'value': 'Next 3 to 6 months'
    }, {
      'name': 'In the next 1 Year',
      'value': 'In the next 1 Year',
    }, {
      'name': 'More than a Year',
      'value': 'More than a Year',
    }]
  }]
};
