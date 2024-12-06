'use client';

import { LightMode } from '@mui/icons-material';
import { Box, Input, Typography } from '@mui/joy';
import { ChangeEvent, useState } from 'react';

import { getAuthHeader } from '@/util/auth';
import { getEnv } from '@/util/getEnv';

export default function Home() {
  const [value, setValue] = useState('');
  const [aiResponse, setAiResponse] = useState('');
  const [asking, setAsking] = useState(false);

  return (
    <Box
      height='100dvh'
      display='flex'
      flexDirection='column'
      p={4}
      gap={10}
      alignItems='center'
    >
      <Box display='flex' flexDirection='column' alignItems='center'>
        <LightMode sx={{ width: '5rem', height: '5rem' }} color='warning' />
        <Typography level='h3' p={2}>
          11月のお天気ボット
        </Typography>
      </Box>
      <Box
        width='100%'
        display='flex'
        flexDirection='column'
        alignItems='center'
        gap={2}
      >
        <Input
          value={value}
          placeholder='11月の東京と銚子の天気のことなら何でも聞いて下さい'
          sx={{ width: '30rem' }}
          onChange={onChange}
          onFocus={() => setValue('')}
          onKeyDown={(e) => {
            if (e.key === 'Enter') onEnter();
          }}
          disabled={asking}
        />
        <Typography>{aiResponse}</Typography>
      </Box>
    </Box>
  );

  function onChange(e: ChangeEvent<HTMLInputElement>) {
    setValue(e.target.value);
  }

  async function onEnter() {
    setAsking(true);

    const apiBaseUrl = await getEnv('API_BASE_URL');
    const authHeader = getAuthHeader();

    const url = `${apiBaseUrl}/azure_openai/ask`;
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...authHeader,
      },
      method: 'POST',
      body: JSON.stringify({ text: value }),
    });

    if (!response.ok) {
      console.error('Failed to fetch');
      setAsking(false);
      return;
    }

    const data = await response.json();
    console.log(data);
    setAiResponse(data.res.content);
  }
}
