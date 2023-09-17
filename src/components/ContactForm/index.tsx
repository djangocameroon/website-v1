import { Row, Col } from "antd";
import { withTranslation } from "react-i18next";
import { Slide, Zoom } from "react-awesome-reveal";
import { ContactProps, ValidationTypeProps } from "./types";
import { useForm } from "../../common/utils/useForm";
import validate from "../../common/utils/validationRules";
import { Button } from "../../common/Button";
import Block from "../Block";
import Input from "../../common/Input";
import TextArea from "../../common/TextArea";
import { useState } from "react";
import { ContactContainer, FormGroup, Span, ButtonContainer } from "./styles";
import axios from "axios";

const Contact = ({ title, content, id, t }: ContactProps) => {

  const [name, setName] = useState("");
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const sendMessage = () => {
    const data = {
      name: name,
      email: email,
      message: message,
    };

    axios.defaults.headers.post['Content-Type'] = 'application/json';
    axios.post('https://formsubmit.co/ajax/dff2a97d12f52707765af962b62c774f', data);
  };

  const { values, errors, handleChange, handleSubmit } = useForm(validate) as any;

  const ValidationType = ({ type }: ValidationTypeProps) => {
    const ErrorMessage = errors[type];
    return (
      <Zoom direction="left">
        <Span errors={errors[type]}>{ErrorMessage}</Span>
      </Zoom>
    );
  };

  return (
    <ContactContainer id={id}>
      <Row justify="space-between" align="middle">
        <Col lg={12} md={11} sm={24} xs={24}>
          <Slide direction="left">
            <Block title={title} content={content} />
          </Slide>
        </Col>
        <Col lg={12} md={12} sm={24} xs={24}>
          <Slide direction="right">
            <FormGroup autoComplete="off" onSubmit={handleSubmit}>
              <Col span={24}>
                <Input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={name || ""}
                  onChange={(e) => setName(e.target.value)}
                />
                <ValidationType type="name" />
              </Col>
              <Col span={24}>
                <Input
                  type="text"
                  name="email"
                  placeholder="Your Email"
                  value={email || ""}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <ValidationType type="email" />
              </Col>
              <Col span={24}>
                <TextArea
                  placeholder="Your Message"
                  value={message || ""}
                  name="message"
                  onChange={(e) => setMessage(e.target.value)}
                />
                <ValidationType type="message" />
              </Col>
              <ButtonContainer>
                <Button name="submit">{t("Submit")}</Button>
              </ButtonContainer>
            </FormGroup>
          </Slide>
        </Col>
      </Row>
    </ContactContainer>
  );
};

export default withTranslation()(Contact);
