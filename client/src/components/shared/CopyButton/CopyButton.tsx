import React, { useState, useEffect } from 'react';
import { copyToClipboard } from '../../../utils/utils';
import { Button, CopiedContainer, SuccessIcon } from './CopyButtonStyles';

type CopyButtonProps = {
  name: string;
  id: string | string[];
  width?: string;
  margin?: string;
  listPage?: boolean;
};

const CopyButton = ({ name, id, width, margin, listPage }: CopyButtonProps) => {
  const [copied, setCopied] = useState<boolean>(false);

  const copyLink = async () => {
    // https://listify.julianvazquez.me/list?name=Some%20list&id=27bb81ae-992b-436c-9c2c-a316f236447b
    const url = `https://listify.julianvazquez.me/list?name=${name}&id=${id}`;
    const copySuccess = await copyToClipboard(url);
    setCopied(copySuccess);
  };

  useEffect(() => {
    let timer;
    if (copied) {
      timer = setTimeout(() => setCopied(false), 3000);
    }
    return () => clearTimeout(timer);
  }, [copied]);

  return (
    <Button onClick={copyLink} listPage={listPage}>
      {copied ? (
        <CopiedContainer>
          <SuccessIcon /> Copied
        </CopiedContainer>
      ) : (
        'Copy link'
      )}
    </Button>
  );
};

export default CopyButton;
