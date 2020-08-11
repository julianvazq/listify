import React, { useState, useEffect } from 'react';
import { Member } from '../ListPage';
import { MembersContainer, Heading, Action } from './MembersStyles';

type MembersProps = {
  members: Member[];
};

const Members: React.FC<MembersProps> = ({ members }) => {
  const [membersDisplayed, setMembersDisplayed] = useState<string[]>([]);
  const [showAllMembers, setShowAllMembers] = useState<boolean>(false);

  useEffect(() => {
    if (members.length < 3) {
      const membersToDisplay = members.map((member, index) => {
        if (index === membersDisplayed.length - 1) {
          return member.name;
        }
        return `${member.name}, `;
      });

      setMembersDisplayed(membersToDisplay);
      return;
    }

    if (showAllMembers) {
      setMembersDisplayed(getAllMembers(members));
    } else {
      setMembersDisplayed(getPartialMembers(members));
    }
  }, [showAllMembers]);

  const getPartialMembers = (members) => {
    let slicedMembers = members.slice(0, 3);

    let membersOutput = slicedMembers.map((member, index) => {
      if (index === slicedMembers.length - 1) {
        return member.name;
      }
      return `${member.name}, `;
    });

    membersOutput =
      membersOutput.join('') + ` + ${members.length - 3} other(s)`;

    return membersOutput;
  };

  const getAllMembers = (members) => {
    let membersOutput = members.map((member, index) => {
      if (index === members.length - 1) {
        return member.name;
      }
      return `${member.name}, `;
    });

    return membersOutput;
  };

  return (
    <MembersContainer>
      <p>
        <Heading>Members:</Heading> {membersDisplayed}{' '}
        {showAllMembers ? (
          <Action onClick={() => setShowAllMembers(false)}>[Hide]</Action>
        ) : (
          <Action onClick={() => setShowAllMembers(true)}>[Show]</Action>
        )}
      </p>
    </MembersContainer>
  );
};

export default Members;
