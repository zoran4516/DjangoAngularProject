from rest_framework import serializers
from accounts.models import User, UserProfile
from accounts import models
from survey.models import Survey

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('email', 'username', 'password', 'first_name', 'phone_number')


class RespondentProfileSerializer(serializers.ModelSerializer):
    """
    Example JSON: {"user":
        {"email":"client@gmail.com",
            "username":"client",
            "password":"password123",
            "firstName":"client",
            "phoneNumber":"7898914383"},
        "gender":"M",
        "dob":"1998-07-08",
        "city": "Indore",
        "state": "Madhya Pradesh",
        "country": "India",
        "pincode": "452001"
        }'
    """
    user = UserSerializer()

    class Meta:
        model = UserProfile
        fields = ('user',
                  'gender',
                  'dob',
                  'city',
                  'state',
                  'country',
                  'pincode')

    def create(self, validated_data, instance=None):
        """
        Given a dictionary of deserialized field values, either update
        an existing model instance, or create a new model instance.
        """
        user_data = validated_data.pop('user')
        user = User.objects.create(**user_data)
        respondent_profile = RespondentProfile.objects.create(user=user, **validated_data)
        return respondent_profile


class ClientProfileSerializer(serializers.ModelSerializer):
    user = UserSerializer()

    class Meta:
        model = UserProfile
        fields = ('user',
                  'designation',
                  'company_name',
                  'address')

    def create(self, validated_data, instsance=None):
        user_data = validated_data.pop('user')
        address_data = validated_data.pop('address')
        user = User.objects.create(**user_data)
        # TODO: Check for foreign key support
        client_profile = UserProfile.objects.create(user=user,  **validated_data)
        return client_profile


# ====================


class UserProfileSerializer(serializers.ModelSerializer):

    class Meta:
        model = UserProfile
        fields = ('first_name', 'middle_name', 'last_name', 'country', 'state', 'city', 'pincode',
                  'company_name', 'email', 'designation', 'address', 'phone', 'profile_pic', 'user_type')

    def update(self, instance, validated_data):
        instance.first_name = validated_data.get('first_name', instance.first_name)
        instance.middle_name = validated_data.get('middle_name', instance.middle_name)
        instance.last_name = validated_data.get('last_name', instance.last_name)
        instance.country = validated_data.get('country', instance.country)
        instance.state = validated_data.get('state', instance.state)
        instance.city = validated_data.get('city', instance.city)
        instance.pincode = validated_data.get('pincode', instance.pincode)

        instance.company_name = validated_data.get('company_name', instance.company_name)
        instance.email = validated_data.get('email', instance.email)
        instance.designation = validated_data.get('designation', instance.designation)
        instance.address = validated_data.get('address', instance.address)
        instance.phone = validated_data.get('phone', instance.phone)
        instance.save()
        return instance


# =========================================


class StateSerializer(serializers.ModelSerializer):

    class Meta:
        model = models.StateMaster
        fields = ('state_id', 'state_name', 'state_code')


class SurveySerializer(serializers.ModelSerializer):

    class Meta:
        model = Survey
        fields = '__all__'


class CountrySerializer(serializers.ModelSerializer):

    class Meta:
        model = models.CountryMaster
        fields = ('country_id', 'country_name', 'country_code')


class UserProfileDataSerializer(serializers.ModelSerializer):

    class Meta:
        model = models.UserProfile
        fields = '__all__'
