from allauth.account.forms import SignupForm
from django import forms
from django.core.validators import RegexValidator

from .models import UserProfile


class ClientSignupForm(SignupForm):
    # first_name = forms.CharField(max_length=30)
    # last_name = forms.CharField(max_length=30)
    # middle_name = forms.CharField(max_length=35)
    # designation = forms.CharField(max_length=60)
    # company_name = forms.CharField(max_length=60)
    # correspondence_email = forms.EmailField()
    # address_street = forms.CharField(max_length=100)
    # city = forms.CharField(max_length=60)
    # state = forms.CharField(max_length=60)
    # country = forms.CharField(max_length=60)
    # pincode = forms.CharField(max_length=6)
    # phone_regex = RegexValidator(regex=r'^\+?1?\d{9,15}$',
    #                              message="Phone number must be entered in the format: '+999999999'. Up to 15 digits allowed.")
    # phone_number = forms.CharField(validators=[phone_regex], max_length=15)
    #
    # # fields = forms.fields_for_model(ClientProfile, exclude=['address', 'user'])
    #
    # def save(self, request):
    #     user = super(ClientSignupForm, self).save(request)
    #     address = None
    #     client_profile = None
    #     phone_number = None
    #     try:
    #         data = self.cleaned_data
    #         address = Address(address_street=data.get('address_street'),
    #                           city=data.get('city'),
    #                           state=data.get('state'),
    #                           pincode=data.get('pincode'),
    #                           country=data.get('country'))
    #         address.save()
    #         client_profile = ClientProfile(address=address,
    #                                        user=user,
    #                                        first_name=data.get('first_name'),
    #                                        middle_name=data.get('middle_name'),
    #                                        last_name=data.get('last_name'),
    #                                        designation=data.get('designation'),
    #                                        company_name=data.get('company_name'),
    #                                        correspondence_email=data.get('correspondence_email'))
    #         client_profile.save()
    #         phone_number = Phone(user=user, phone_number=data.get('phone'))
    #         phone_number.save()
    #         return user
    #     except:
    #         if phone_number is not None:
    #             phone_number.delete()
    #         if client_profile is not None:
    #             client_profile.delete()
    #         if address is not None:
    #             address.delete()
    #         if user is not None:
    #             user.delete()
    #         raise Exception("Some error occured, could not complete the signup")

    GENDER_CHOICES = (
        ('M', 'Male'),
        ('F', 'Female'),
    )
    gender = forms.ChoiceField(widget=forms.Select(), choices=GENDER_CHOICES, required=False)
    birthday = forms.DateField(widget=forms.SelectDateWidget(), required=False)
    city = forms.CharField(max_length=60, required=False)
    state = forms.CharField(max_length=60, required=False)
    country = forms.CharField(max_length=60, required=False)
    pincode = forms.CharField(max_length=6, required=False)

    def save(self, request):
        user = super(ClientSignupForm, self).save(request)
        respondent = UserProfile(
            user=user,
            email=self.cleaned_data.get('email'),
            # user_type="Client"
        )
        respondent.save()
        # request.session["userType"] = 'Client'
        # request.session["user"] = str(user.pk)
        return user


class RespondentSignupForm(SignupForm):
    GENDER_CHOICES = (
        ('M', 'Male'),
        ('F', 'Female'),
    )
    gender = forms.ChoiceField(widget=forms.Select(), choices=GENDER_CHOICES, required=False)
    birthday = forms.DateField(widget=forms.SelectDateWidget(), required=False)
    city = forms.CharField(max_length=60, required=False)
    state = forms.CharField(max_length=60, required=False)
    country = forms.CharField(max_length=60, required=False)
    pincode = forms.CharField(max_length=6, required=False)

    def save(self, request):
        user = super(RespondentSignupForm, self).save(request)
        respondent = UserProfile(
            user=user,
            email=self.cleaned_data.get('email'),
            user_type="Respondent"
            # gender=self.cleaned_data.get('gender', None),
            # city=self.cleaned_data.get('city'),
            # state=self.cleaned_data.get('state'),
            # country=self.cleaned_data.get('country'),
            # pincode=self.cleaned_data.get('pincode'),
            # birthday=self.cleaned_data.get('birthday'),
        )
        respondent.save()
        # request.session["userType"] = 'Respondent'
        # request.session["user"] = str(user.pk)
        return user


# =============================================


class UserProfileForm(forms.ModelForm):
    first_name = forms.CharField(required=True, widget=forms.TextInput(attrs={'placeholder': 'First Name'}))
    middle_name = forms.CharField(required=False, widget=forms.TextInput(attrs={'placeholder': 'Middle Name'}))
    last_name = forms.CharField(required=False, widget=forms.TextInput(attrs={'placeholder': 'Last Name'}))
    city = forms.CharField(required=True, widget=forms.TextInput(attrs={'placeholder': 'City'}))
    state = forms.CharField(required=True, widget=forms.TextInput(attrs={'placeholder': 'State'}))
    pincode = forms.CharField(required=True, widget=forms.TextInput(attrs={'placeholder': 'Pincode'}))
    country = forms.CharField(required=True, widget=forms.TextInput(attrs={'placeholder': 'Country'}))

    class Meta:
        model = UserProfile
        fields = ['first_name', 'middle_name', 'last_name', 'city', 'state', 'pincode', 'country', 'profile_pic']


class UserProfileCompleteForm(forms.ModelForm):
    company_name = forms.CharField(required=True, widget=forms.TextInput(attrs={'placeholder': 'Company Name'}))
    email = forms.CharField(required=True, widget=forms.TextInput(attrs={'placeholder': 'Email Office'}))
    designation = forms.CharField(required=True, widget=forms.TextInput(attrs={'placeholder': 'Designation'}))
    address = forms.CharField(required=True, widget=forms.TextInput(attrs={'placeholder': 'Address'}))
    phone = forms.CharField(required=True, widget=forms.TextInput(attrs={'placeholder': 'Your Phone Number'}))

    class Meta:
        model = UserProfile
        fields = ['company_name', 'email', 'designation', 'address', 'phone', 'company_logo']


class UserCompleteForm(UserProfileForm, UserProfileCompleteForm):

    class Meta:
        model = UserProfile
        fields = ['first_name', 'middle_name', 'last_name', 'city', 'state', 'pincode', 'country',
                  'company_name', 'email', 'designation', 'address', 'phone', 'profile_pic', 'company_logo']
