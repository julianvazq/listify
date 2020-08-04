import React from 'react';
import { Member } from '../ListPage';

type MembersProps = {
  members: Member[];
};

const Members: React.FC<MembersProps> = ({ members }) => {
  const formatAndReturnMembers = (members) => {
    const longMembersList = members.length > 3;

    const membersDisplayed = longMembersList ? members.slice(0, 3) : members;
    let membersOutput = membersDisplayed.map((member, index) => {
      if (index === membersDisplayed.length - 1) {
        return member.name;
      }
      return `${member.name}, `;
    });

    let finalOutput = membersOutput;

    if (longMembersList) {
      finalOutput =
        membersOutput.join('') + ` + ${members.length - 3} other(s).`;
    }

    return finalOutput;
  };

  return (
    <div>
      <p>Members: {formatAndReturnMembers(members)}</p>
    </div>
  );
};

export default Members;
