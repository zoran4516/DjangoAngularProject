# -*- coding: utf-8 -*-
# Generated by Django 1.11 on 2018-09-14 14:05
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0017_auto_20180906_1245'),
    ]

    operations = [
        migrations.AddField(
            model_name='userprofile',
            name='company_logo',
            field=models.ImageField(blank=True, null=True, upload_to='profile/'),
        ),
        migrations.AddField(
            model_name='userprofile',
            name='profile_pic',
            field=models.ImageField(blank=True, null=True, upload_to='profile/'),
        ),
    ]