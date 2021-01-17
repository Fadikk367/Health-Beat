import React from 'react';
import { differenceInYears } from 'date-fns';

import { TextRow } from './PersonalData.css';
import { User } from 'interfaces';

interface PersonalDataProps {
  user: User | null;
}

const PersonalData: React.FC<PersonalDataProps> = ({ user }) => {
  const yearsOld = user && differenceInYears(new Date(), new Date(user.birthDate));

  return (
    <TextRow>
      {user?.firstName} {user?.lastName}, {yearsOld} years old
    </TextRow>
  )
}

export default PersonalData
