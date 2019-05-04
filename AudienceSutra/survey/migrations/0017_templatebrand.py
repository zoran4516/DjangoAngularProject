# -*- coding: utf-8 -*-
# Generated by Django 1.11.13 on 2018-08-06 10:39
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('survey', '0016_auto_20180806_1559'),
    ]

    operations = [
        migrations.CreateModel(
            name='TemplateBrand',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('age', models.CharField(max_length=400, verbose_name='Age')),
                ('gender', models.TextField(verbose_name='Gender')),
                ('nccs', models.TextField(verbose_name='NCSS')),
                ('details', models.CharField(max_length=400, verbose_name='Details')),
                ('report', models.TextField(verbose_name='Report')),
                ('brand', models.TextField(verbose_name='Brand')),
                ('associated', models.TextField(verbose_name='Associated')),
                ('category', models.TextField(verbose_name='Category')),
                ('newcategory', models.TextField(verbose_name='Newcategory')),
                ('new', models.TextField(verbose_name='New')),
                ('new2', models.TextField(verbose_name='New2')),
                ('concerns', models.CharField(max_length=400, verbose_name='Concerns')),
                ('creator', models.IntegerField(blank=True, null=True)),
            ],
        ),
    ]