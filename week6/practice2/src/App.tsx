import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useState } from 'react';

const getUsers = async (): Promise<string[]> => {
  const response = await axios.get('https://api.atsopt-seminar4.site/api/v1/users');
  return response.data.data.nicknameList;
};

const getMyNickname = async (): Promise<string> => {
  const response = await axios.get('https://api.atsopt-seminar4.site/api/v1/users/me');
  return response.data.data.nickname;
};

const patchNickname = async (): Promise<void> => {
  await axios.patch('https://api.atsopt-seminar4.site/api/v1/users/', { userId: 23 });
};

function App() {
  const [userId, setUserId] = useState<string>('23');
  const { data: myNickname, isLoading: isLoadingMyNickname, isError: isErrorMyNickname, refetch: refetchMyNickname } = useQuery<string>({
    queryKey: ['myNickname'],
    queryFn: getMyNickname,
    enabled: false,
  });
  const { data, isLoading, isError, refetch } = useQuery<string[]>({
    queryKey: ['users'],
    queryFn: getUsers,
    enabled: false,
  });

  return (
    <div>
      <h1>My Nickname</h1>
      <button onClick={() => refetchMyNickname()}>조회하기</button>
      {isLoadingMyNickname && <div>Loading...</div>}
      {isErrorMyNickname && <div>Error</div>}
      {myNickname && <div>{myNickname}</div>}
      <div>
        <input
          type="text"
          value={userId}
          onChange={e => setUserId(e.target.value)}
          placeholder="User ID 입력"
        />
        <button onClick={() => patchNickname()}>
          닉네임 변경
        </button>
      </div>
      <h1>Users</h1>
      <button onClick={() => refetch()}>조회하기</button>
      {isLoading && <div>Loading...</div>}
      {isError && <div>Error</div>}
      {data?.map((nick: string, idx: number) => (
        <div key={idx}>{nick}</div>
      ))}
    </div>
  );
}

export default App;