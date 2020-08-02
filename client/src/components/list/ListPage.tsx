import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import queryString from 'query-string';
import io from 'socket.io-client';
import { RouteComponentProps } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';
import CreateButton from '../home/CreateButton/CreateButton';
import Modal from '../shared/Modal/Modal';
import UserForm from './UserForm/UserForm';

type LocationProps = { search: string };

type ErrorState = { error: string } | null;

type Item = {
  item_id: string;
  item_name: string;
  created_by: string;
};

type Member = {
  name: string;
};

let socket;

const ListPage = ({ location }: RouteComponentProps<LocationProps>) => {
  const { storedUser, setStoredUser, addUserList } = useContext(UserContext);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [listName, setListName] = useState<string | null>(null);
  const [items, setItems] = useState<Item[]>([]);
  const [members, setMembers] = useState<Member[]>([]);
  const [error, setError] = useState<ErrorState>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const { name, id, new: isNewList } = queryString.parse(location.search);

  const updateURL = () => {
    window.history.replaceState(
      null,
      '',
      `${location.pathname}?name=${name}&id=${id}`
    );
  };

  useEffect(() => {
    setTimeout(() => {
      if (!storedUser.username) setModalVisible(true);
    }, 2000);
  }, []);

  useEffect(() => {
    /* Clear error */
    setError(null);
    setLoading(true);

    socket = io('localhost:4000');
    socket.emit(
      'join',
      {
        isNewList: isNewList !== undefined ? true : false,
        listId: id,
        listName: name,
        user: storedUser,
      },
      (res: any) => {
        console.log(res);
        if (res.error) {
          setError(res);
          setLoading(false);
        }

        if (isNewList !== undefined) {
          updateURL();
        }

        setLoading(false);
        setListName(res.listName);
        setItems(res.items);
        setMembers(res.members);

        addUserList({ id, name: res.listName });
      }
    );

    // setListName(storedListName);

    // return () => {
    //   socket.emit('disconnect');

    //   socket.off();
    // };
  }, [location.search]);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  if (!loading && error) {
    return (
      <>
        <h1>{error.error}</h1>
        <CreateButton />
      </>
    );
  }

  /* If list name is not set after coming 
  back from server then it doesn't exist */
  if (!loading && !listName) {
    return (
      <>
        <h1>This list does not seem to exist.</h1>
        <CreateButton />
      </>
    );
  }

  return (
    <div>
      <h1>{listName}</h1>
      <h2>LIST PAGE</h2>
      Members:{' '}
      {members.map((member, index) => (
        <span key={index}>{member.name}</span>
      ))}
      <ul>
        {items.map((item) => (
          <li key={item.item_id}>{item.item_name}</li>
        ))}
      </ul>
      <Modal
        modalVisible={modalVisible}
        onClose={() => {
          setStoredUser({ ...storedUser, username: 'Anonymous' });
          setModalVisible(false);
        }}
      >
        <UserForm setModalVisible={setModalVisible} />
      </Modal>
    </div>
  );
};

export default ListPage;
