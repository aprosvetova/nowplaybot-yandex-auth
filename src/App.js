import React, {Component} from 'react';
import {Badge, CardDeck, Col, Container, Image, Row} from 'react-bootstrap'
import AuthForm from "./AuthForm";
import TrustCard from "./TrustCard";

class App extends Component {
    render() {
        return (
            <Container>
                <Row className="mt-5">
                    <Col className="d-none d-xl-block col-md-3"/>
                    <Col>
                        <Row>
                            <Container>
                                <h4><a href="tg://resolve?domain=nowplaybot">@nowplaybot</a> <Badge variant="primary">Yandex.Music</Badge></h4>
                            </Container>
                        </Row>
                        <Row>
                            <Container style={{'text-align': 'center'}}>
                                <Image src="logo.svg" width="40%"/>
                            </Container>
                        </Row>
                        <Row>
                            <Container>
                                <p>Эта форма предназначена для соединения вашей Яндекс.Музыки и бота для отправки последних прослушанных треков в Телеграм.</p>
                                <p>Смело вводите свои данные ниже. Если переживаете, покажите эту форму любому другу-программисту — он объяснит, что всё в порядке.</p>
                            </Container>
                        </Row>
                    </Col>
                    <Col className="d-none d-xl-block col-md-3"/>
                </Row>
                <Row>
                    <Col className="d-none d-xl-block col-md-3"/>
                    <Col>
                        <AuthForm/>
                    </Col>
                    <Col className="d-none d-xl-block col-md-3"/>
                </Row>
                <Row className="mt-5">
                    <Container className="justify-content-center ">
                        <h2 className="text-center mb-3">Причины, по которым нам стоит доверять</h2>
                        <Row>
                            <CardDeck>
                                <TrustCard icon={['fab', 'yandex']} title="Напрямую в Яндекс!"
                                           text="Ваш логин и пароль отправляется с Вашего компьютера сразу на сервера
                                           Яндекса без каких-либо посредников."/>
                                <TrustCard icon={['fab', 'expeditedssl']} title="Используем безопасное соединение!"
                                           text="Все ваши данные отправляются в зашифрованном виде через протокол HTTPS."/>
                                <TrustCard icon="key" title="Не храним ваши пароли!"
                                           text="На наших серверах хранится только Ваш уникальный токен,
                                           полученный при авторизации."/>
                            </CardDeck>
                            <CardDeck>
                                <TrustCard icon="code" title="Открытый исходный код!"
                                           text="Весь исходный код опубликован в репозитории на GitHub и доступен для
                                            просмотра."/>
                                <TrustCard icon="shield-alt" title="Только официальное приложение!"
                                           text="Авторизация происходит через OAuth приложение Яндекса используемое в их
                                           клиентах."/>
                                <TrustCard icon="spinner" title="Выполнение в браузере!"
                                           text="Весь код выполняется в Вашем браузере без возможности вмешательства с
                                           чьей-либо стороны."/>
                            </CardDeck>
                        </Row>
                    </Container>
                </Row>
                <hr/>
                <Row className="mb-3">
                    <Container>
                        <Row className="d-flex justify-content-between">
                            <Col>
                                <span>Исходный код: <a
                                    href="https://github.com/aprosvetova/nowplaybot-yandex-auth">nowplaybot-yandex-auth</a></span>
                            </Col>
                            <Col className="text-right">
                                <span> Автор <a href="https://github.com/MarshalX/yandex-music-token">оригинальной странички</a>: <a href="tg://resolve?domain=MarshalX">@MarshalX</a></span>
                            </Col>
                        </Row>
                    </Container>
                </Row>
            </Container>
        );
    }
}

export default App;
