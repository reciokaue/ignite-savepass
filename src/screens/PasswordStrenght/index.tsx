import React, { useState,  } from 'react';

import {
  Container,
} from './styles';
import { PasswordCheck } from '../../components/Form/PasswordCheck';


export function PasswordStrenght() {
  const [ passwordText, setPasswordText ] = useState('')

  return (
    <Container>
      <PasswordCheck 
        setText={setPasswordText}
        textValue={passwordText}
        title="Generete your Password"
      />
    </Container>
  )
}
