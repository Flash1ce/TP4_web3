from flask import g
import configparser


def get_config():
    if 'config' not in g:
        g.config = configparser.ConfigParser()
        g.config.read('app.config')

    return g.config
