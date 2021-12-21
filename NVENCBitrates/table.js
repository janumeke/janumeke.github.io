const TEXT = {
    'OPTION': {
        'LOW': '稍差',
        'MID': '普通',
        'HIGH': '稍好',
        'VERYHIGH': '很好',
    },
};

const TABLE = {
    'IRL': {
        'options': [
            TEXT.OPTION.LOW,
            TEXT.OPTION.MID,
            TEXT.OPTION.HIGH,
            TEXT.OPTION.VERYHIGH,
        ],
        'default': TEXT.OPTION.MID,
        [TEXT.OPTION.LOW]: {
            'resolution': '1280x720',
            'framerate': 30,
            'bitrate': 3000,
            'vbs': false,
            'defaultMax': null,
            'stable': false,
            'stableMax': null,
        },
        [TEXT.OPTION.MID]: {
            'resolution': '1280x720',
            'framerate': 40,
            'bitrate': 3500,
            'vbs': false,
            'defaultMax': null,
            'stable': false,
            'stableMax': null,
        },
        [TEXT.OPTION.HIGH]: {
            'resolution': '1920x1080',
            'framerate': 40,
            'bitrate': 4500,
            'vbs': false,
            'defaultMax': null,
            'stable': false,
            'stableMax': null,
        },
        [TEXT.OPTION.VERYHIGH]: {
            'resolution': '1920x1080',
            'framerate': 60,
            'bitrate': 6000,
            'vbs': false,
            'defaultMax': null,
            'stable': false,
            'stableMax': null,
        },
    },
    '2D': {
        'options': [
            TEXT.OPTION.LOW,
            TEXT.OPTION.MID,
            TEXT.OPTION.HIGH,
            TEXT.OPTION.VERYHIGH,
        ],
        'default': TEXT.OPTION.MID,
        'stable': true,
        [TEXT.OPTION.LOW]: {
            'resolution': '1280x720',
            'framerate': 40,
            'bitrate': 3000,
            'vbs': true,
            'defaultMax': 5000,
            'stable': true,
            'stableMax': 4000,
        },
        [TEXT.OPTION.MID]: {
            'resolution': '1280x720',
            'framerate': 60,
            'bitrate': 3500,
            'vbs': true,
            'defaultMax': 5500,
            'stable': true,
            'stableMax': 4500,
        },
        [TEXT.OPTION.HIGH]: {
            'resolution': '1920x1080',
            'framerate': 60,
            'bitrate': 4500,
            'vbs': true,
            'defaultMax': 7000,
            'stable': true,
            'stableMax': 5500,
        },
        [TEXT.OPTION.VERYHIGH]: {
            'resolution': '1920x1080',
            'framerate': 60,
            'bitrate': 6500,
            'vbs': true,
            'defaultMax': 9000,
            'stable': true,
            'stableMax': 7500,
        },
    },
    'TopDown': {
        'options': [
            TEXT.OPTION.LOW,
            TEXT.OPTION.MID,
            TEXT.OPTION.HIGH,
            TEXT.OPTION.VERYHIGH,
        ],
        'default': TEXT.OPTION.MID,
        'stable': true,
        [TEXT.OPTION.LOW]: {
            'resolution': '1280x720',
            'framerate': 40,
            'bitrate': 3500,
            'vbs': true,
            'defaultMax': 5000,
            'stable': false,
            'stableMax': null,
        },
        [TEXT.OPTION.MID]: {
            'resolution': '1920x1080',
            'framerate': 40,
            'bitrate': 4500,
            'vbs': true,
            'defaultMax': 6000,
            'stable': true,
            'stableMax': 5000,
        },
        [TEXT.OPTION.HIGH]: {
            'resolution': '1920x1080',
            'framerate': 60,
            'bitrate': 6000,
            'vbs': true,
            'defaultMax': 8000,
            'stable': true,
            'stableMax': 7000,
        },
        [TEXT.OPTION.VERYHIGH]: {
            'resolution': '1920x1080',
            'framerate': 60,
            'bitrate': 7500,
            'vbs': true,
            'defaultMax': 9500,
            'stable': false,
            'stableMax': null,
        },
    },
    '3rd': {
        'options': [
            TEXT.OPTION.LOW,
            TEXT.OPTION.MID,
            TEXT.OPTION.HIGH,
        ],
        'default': TEXT.OPTION.MID,
        'stable': true,
        [TEXT.OPTION.LOW]: {
            'resolution': '1920x1080',
            'framerate': 40,
            'bitrate': 4000,
            'vbs': true,
            'defaultMax': 5500,
            'stable': false,
            'stableMax': null,
        },
        [TEXT.OPTION.MID]: {
            'resolution': '1920x1080',
            'framerate': 60,
            'bitrate': 5000,
            'vbs': true,
            'defaultMax': 6500,
            'stable': true,
            'stableMax': 6000,
        },
        [TEXT.OPTION.HIGH]: {
            'resolution': '1920x1080',
            'framerate': 60,
            'bitrate': 6500,
            'vbs': true,
            'defaultMax': 8500,
            'stable': true,
            'stableMax': 7500,
        },
    },
    '1st': {
        'options': [
            TEXT.OPTION.LOW,
            TEXT.OPTION.MID,
            TEXT.OPTION.HIGH,
        ],
        'default': TEXT.OPTION.MID,
        'stable': true,
        [TEXT.OPTION.LOW]: {
            'resolution': '1280x720',
            'framerate': 40,
            'bitrate': 4500,
            'vbs': true,
            'defaultMax': 5500,
            'stable': false,
            'stableMax': null,
        },
        [TEXT.OPTION.MID]: {
            'resolution': '1280x720',
            'framerate': 60,
            'bitrate': 6000,
            'vbs': true,
            'defaultMax': 8000,
            'stable': true,
            'stableMax': 7000,
        },
        [TEXT.OPTION.HIGH]: {
            'resolution': '1920x1080',
            'framerate': 60,
            'bitrate': 8000,
            'vbs': true,
            'defaultMax': 10500,
            'stable': true,
            'stableMax': 8500,
        },
    },
};