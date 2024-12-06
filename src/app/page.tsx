'use client';

import { LightMode } from '@mui/icons-material';
import { Box, Button, Input, Typography } from '@mui/joy';
import { ChangeEvent, useState } from 'react';

import { ask } from '@/util/apiService';
import { getToken } from '@/util/auth';

export default function Home() {
  const [value, setValue] = useState('');
  const [aiResponse, setAiResponse] = useState('');
  const [isAsking, setIsAsking] = useState(false);

  return (
    <Box display='flex' flexDirection='column' p={4} gap={10}>
      <Box display='flex' flexDirection='column' alignItems='center'>
        <LightMode sx={{ width: '5rem', height: '5rem' }} color='warning' />
        <Typography level='h3' p={2}>
          11月のお天気ボット
        </Typography>
      </Box>
      <Box display='flex' flexDirection='column' alignItems='center' gap={2}>
        <Input
          value={value}
          placeholder='11月の東京と銚子の天気のことなら何でも聞いて下さい'
          sx={{ width: '30rem' }}
          onChange={onChange}
          onFocus={() => setValue('')}
          onKeyDown={(e) => {
            if (e.key === 'Enter') onEnter();
          }}
          disabled={isAsking}
        />
        <Typography>{aiResponse}</Typography>
        <Button onClick={test}>テスト用</Button>
      </Box>
    </Box>
  );

  async function test() {
    console.log(await getToken());
    // console.log(window.location);
  }

  function onChange(e: ChangeEvent<HTMLInputElement>) {
    setValue(e.target.value);
  }

  async function onEnter() {
    setIsAsking(true);

    const response = await ask({ text: value });

    if (!response.ok) {
      console.error('Failed to fetch');
      setIsAsking(false);
      return;
    }

    const data = await response.json();
    console.log(data);
    setIsAsking(false);
    setAiResponse(data.res.content);
  }
}
