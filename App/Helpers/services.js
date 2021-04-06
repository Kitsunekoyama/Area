export default data = [
    {
        'services': [
            {
                'id': 1, 
                'name': 'DateTime', 
                'logo': 'https://assets.ifttt.com/images/channels/3/icons/monochrome_large.png', 
                'color': '#333333', 
                'action': [
                    {
                        'id': 1, 
                        'name': 'EveryDayAt', 
                        'descr': 'Trigger every day at x hours and y min', 
                        'arg': [
                            {
                                'name': '', 
                                'type': '', 
                                'value': ''
                            },
                            {
                                'name': '', 
                                'type': '', 
                                'value': ''
                            }, 
                            {
                                'name': '', 
                                'type': '', 
                                'value': ''
                            }
                        ]
                    }, 
                    {
                        'id': 2, 
                        'name': 'EveryYearAt', 
                        'descr': 'Trigger every year at x day and x month', 
                        'arg': [
                            {
                                'name': '', 
                                'type': '', 
                                'value': ''
                            }, 
                            {
                                'name': '', 
                                'type': '', 
                                'value': ''
                            }, 
                            {
                                'name': '', 
                                'type': '', 
                                'value': ''
                            }
                        ]
                    }
                ], 
                'reaction': []
            }, 
            {
                'id': 2, 
                'name': 'Discord', 
                'logo': 'https://i.pinimg.com/originals/f4/64/e6/f464e6b259947d29b03c448f121be1af.png', 
                'color': '#7289da', 
                'action': [
                    {
                        'id': 1, 
                        'name': 'DiscordRcv', 
                        'descr': 'Trigger when a message is received in a channel', 
                        'arg': [
                            {
                                'name': 'token', 
                                'type': 'id', 
                                'value': ''
                            }, 
                            {
                                'name': 'channel', 
                                'type': 'id', 
                                'value': ''
                            }
                        ], 
                        'token': 'ODA5ODEzOTE2NDk0MzMxOTQ2.YCaj-w.NFGJKd1U2oq_KLRUhk3UFsoOYIs', 
                        'channel': '810837502151622666', 
                        'client': 
                        {
                            'shard': '', 
                            'users': [], 
                            'guilds': [], 
                            'channels': [], 
                            'user': ''
                        }
                    }
                ], 
                'reaction': [
                    {
                        'id': 1, 
                        'name': 'DiscordMsg', 
                        'descr': 'Send a message on a channel', 
                        'arg': [
                            {
                                'name': 'body', 
                                'type': 'text', 
                                'value': ''
                            }, 
                            {
                                'name': 'token', 
                                'type': 'id', 
                                'value': ''
                            }, 
                            {
                                'name': 'channel', 
                                'type': 'id', 
                                'value': ''
                            }
                        ], 
                        'auth': '', 
                        'body': 'test', 
                        'token': 'ODA5ODEzOTE2NDk0MzMxOTQ2.YCaj-w.NFGJKd1U2oq_KLRUhk3UFsoOYIs', 
                        'channel': '810837502151622666', 
                        'client': 
                        {
                            'shard': '', 
                            'users': [], 
                            'guilds': [], 
                            'channels': [], 
                            'user': ''
                        }
                    }
                ]
            }, 
            {
                'id': 3, 
                'name': 'Youtube', 
                'logo': 'https://assets.ifttt.com/images/channels/32/icons/monochrome_large.png', 
                'color': '#FF0000', 
                'action': [
                    {
                        'id': 1, 
                        'name': 'newVideo', 
                        'descr': 'Trigger when a new Video is posted in a channel', 
                        'arg': [
                            {
                                'name': 'channel', 
                                'type': 'id', 
                                'value': ''
                            }
                        ], 
                        'videos': []
                    }
                ], 
                'reaction': []
            }, 
            {
                'id': 4, 
                'name': 'Twitter', 
                'logo': 'https://images-ext-1.discordapp.net/external/wKjylRc8SaHAmyJhBIE_Hr1PA9TRpYVFx5RKgd5atKE/https/img1.freepng.fr/20180613/hhf/kisspng-uber-new-york-city-logo-real-time-ridesharing-lyft-black-twitter-5b20f43e43aa19.0923188015288863342772.jpg', 
                'color': '#00acee', 
                'action': [
                    {
                        'id': 1, 
                        'name': 'getTweet', 
                        'descr': 'trigger when a tweet with a certain tag is posted', 
                        'arg': [
                            {
                                'name': 'hashtag', 
                                'type': 'id', 
                                'value': ''
                            }, 
                            {
                                'name': 'hashtag', 
                                'type': 'id', 
                                'value': ''
                            }
                        ]
                    }
                ], 
                'reaction': [
                    {
                        'id': 1, 
                        'name': 'postTweet', 
                        'descr': 'post a tweet on twitter', 
                        'arg': 
                        [
                            {
                                'name': 'body', 
                                'type': 'text', 
                                'value': []
                            }
                        ], 
                        'auth': ''
                    }
                ]
            }, 
            {
                'id': 5, 
                'name': 'Gmail', 
                'logo': 'https://logos-world.net/wp-content/uploads/2020/11/Gmail-Logo.png', 
                'color': '#ffffff', 
                'action': [
                    {
                        'id': 1, 
                        'name': 'newMail', 
                        'descr': "Trigger quand l'utilisateur reçoit un mail", 
                        'arg': [
                            {
                                'name': 'google', 
                                'type': 'oauth', 
                                'value': ''
                            }
                        ], 
                        'message': [], 
                        'auth': ''
                    }
                ], 
                'reaction': [
                    {
                        'id': 1, 
                        'name': 'sendMail', 
                        'descr': "Envoie un mail à l'utilisateur X", 
                        'arg': [
                            {
                                'name': 'receiver', 
                                'type': 'id', 
                                'value': ''
                            }, 
                            {
                                'name': 'subject', 
                                'type': 'id', 
                                'value': ''
                            }, 
                            {
                                'name': 'message', 
                                'type': 'text', 
                                'value': ''
                            }, 
                            {
                                'name': 'google', 
                                'type': 'oauth', 
                                'value': ''
                            }
                        ], 
                        'auth': ''
                    }
                ]
            }
        ]
    }
]