import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useState } from 'react';

const getUsers = async (): Promise<string[]> => {
  const response = await axios.get('https://api.atsopt-seminar4.site/api/v1/users');
  return response.data.data.nicknameList;
};

function App() {
  const { data, isLoading, isError, refetch } = useQuery<string[]>({
    queryKey: ['users'],
    queryFn: getUsers,
    enabled: false,
  });

  return (
    <div>
      <h1>Users</h1>
      <button onClick={() => refetch()}>조회하기</button>
      {isLoading && <div>Loading...</div>}
      {isError && <div>Error</div>}
      {data?.map((nick: string) => (
        <div key={nick}>{nick}</div>
      ))}
    </div>
  );
}

export default App;