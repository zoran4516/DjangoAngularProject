# -*- coding: utf-8 -*-
# Generated by Django 1.11.13 on 2018-06-26 06:33
from __future__ import unicode_literals

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('survey', '0007_auto_20180626_1146'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='Response',
            new_name='Responses',
        ),
    ]
