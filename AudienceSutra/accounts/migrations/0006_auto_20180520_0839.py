# -*- coding: utf-8 -*-
# Generated by Django 1.11.13 on 2018-05-20 03:09
from __future__ import unicode_literals

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0005_session'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='created_on',
            field=models.DateTimeField(auto_now_add=True, db_column='created_on', default=django.utils.timezone.now),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='user',
            name='updated_on',
            field=models.DateTimeField(auto_now=True, db_column='updated_on'),
        ),
    ]