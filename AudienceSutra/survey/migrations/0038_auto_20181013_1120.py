# -*- coding: utf-8 -*-
# Generated by Django 1.11 on 2018-10-13 11:20
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('survey', '0037_auto_20181010_1348'),
    ]

    operations = [
        migrations.AddField(
            model_name='question',
            name='is_tricky',
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name='question',
            name='tricky_id',
            field=models.IntegerField(blank=True, default=0, null=True),
        ),
    ]