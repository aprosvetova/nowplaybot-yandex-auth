import {Button, Col, Form, Image, Row} from "react-bootstrap";
import React from "react";
import {CaptchaRequired, CaptchaWrong, YandexMusicApi} from "./Api";


class AuthForm extends React.Component {
    api = new YandexMusicApi();
    mirror = 'https://tx.me/';

    constructor(props) {
        super(props);
        let search = window.location.search;
        let params = new URLSearchParams(search);
        this.state = {
            username: '',
            password: '',
            error: null,
            authenticated: false,
            displayName: params.get('display_name'),
            hash: params.get('hash'),
            branch: params.get('branch') || 'np'
        };
    }

    handleChange = ({target: {name, value}}) => {
        this.setState({...this.state, [name]: value, error: null})
    };

    handleSubmit = event => {
        event.preventDefault();

        this.setState({
            ...this.state,
            x_captcha_url: undefined,
            x_captcha_key: undefined
        });

        const {username, password, x_captcha_answer, x_captcha_key} = this.state;
        this.api.generate_token_by_username_and_password(username, password, x_captcha_answer, x_captcha_key).then(token => {
            this.api.send_token_to_backend(this.state.branch, this.state.hash, token).then(resp => {
                window.location.href = `tg://resolve?domain=nowplaybot`;
                this.setState({...this.state, authenticated: true})
            }).catch(error => {
                this.setState({
                    ...this.state,
                    error
                });
            });
        }).catch(error => {
            if (error instanceof CaptchaRequired || error instanceof CaptchaWrong) {
                const {x_captcha_url, x_captcha_key, error_description} = error.body;
                this.setState({
                    ...this.state,
                    x_captcha_url,
                    x_captcha_key,
                    error: error_description
                })
            } else {
                this.setState({
                    ...this.state,
                    error
                });
            }
        })
    };

    render() {
        const {x_captcha_url, error, authenticated, displayName, hash} = this.state;

        if (!displayName || !hash) {
            return (
                <>
                <p><b>Кажется, вы перешли по неправильной ссылке, поэтому формы не будет.</b></p>
                <p><a href={`${this.mirror}nowplaybot`}>Вернитесь в бота</a> и попробуйте снова.</p>
                </>
                );
        }

        return authenticated ? (
            <>
                <a href={`tg://resolve?domain=nowplaybot`}>
                    <Button variant="primary" block>
                        Перейти в бота
                    </Button>
                </a>
                <small className="text-muted ">Если кнопка не работает -
                    <a href={`${this.mirror}nowplaybot`}> перейдите по ссылке</a>
                </small>
            </>
        ) : (
            <Form>
                <p><b>Внимание! Аккаунт будет подключен к пользователю {displayName}</b></p>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label column={false}>Введите логин, почту или телефон:</Form.Label>
                    <Form.Control name="username" onChange={this.handleChange}
                                  type="email" placeholder="Введите логин, почту или телефон"/>
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label column={false}>Введите пароль</Form.Label>
                    <Form.Control name="password" onChange={this.handleChange}
                                  type="password" placeholder="Введите пароль"/>
                </Form.Group>

                {x_captcha_url &&
                <Form.Group controlId="formBasicCaptcha">
                    <Row className="mb-2">
                        <Col><Image fluid src={x_captcha_url}/></Col>
                        <Col className="align-self-center">
                            <Button className="btn-block" type="submit" onClick={this.handleSubmit}>
                                Обновить
                            </Button>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Control name="x_captcha_answer" onChange={this.handleChange}
                                          type="text" placeholder="Введите код с картинки"/>
                        </Col>
                    </Row>
                </Form.Group>
                }

                <Button variant="primary" type="submit" block onClick={this.handleSubmit}>
                    Войти
                </Button>

                {error &&
                <p className="mt-1 text-danger">{`${error}`}</p>
                }
            </Form>
        );
    }
}

export default AuthForm;
