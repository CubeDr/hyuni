import { redirect } from 'next/navigation';

interface Props {
  params: {
    legacy: string;
  }
}

// Legacy redirections to keep backwards compatibility from Tistory.
const REDIRECT_IDS: { [key: string]: string } = {
  '4': 'HAkjznuIRlQnBprqvFOB',
  '5': 'xZ7GrXXW94VzT2Lyiz5a',
  '6': '8Jf3g1fgtVA2KrZBkRDQ',
  '7': 'qqK2tlLCrOyYAuahj8FY',
  '9': 'gaF6qaCBBNrWbNgGhFCh',
  '10': 'xvMcnSaFFBBWgfQEiGlU',
  '11': 'JjpxTwTInJLiMpZrRrMU',
  '12': 'sWic09o4Fj0zM9CCIfvW',
  '13': 'W1SN6GS4sKkEpiR9z49j',
  '14': 'mErpELpkjbtMhLJqnEf3',
  '15': 'DM6Cu4G17WtCL45Thv6h',
  '16': 'C6o9S7cMT2ZgSp5HBWv6',
  '17': 'PnunbcBXkULQcxlkji6t',
  '20': '2WPSgdK3zIhf3lmKBqnM',
  '21': '3V4WDdO0M0R4BYcf9Nys',
  '22': 'wBOH6VGYojfO7rRaMspE',
  '23': 'nDxAw1VfvoW8fB9VAemO',
  '24': '71Zll7tsmkfJVcNB3vrm',
  '25': 'xqj8mhTDg9DezzRv8PQs',
  '26': 'm6D7DxBNSDacQn80fJCT',
  '27': 'oq9LfgXh1dxt7uQ46yPS',
  '28': '6DfarGbSppjAMB2AHkY6',
  '29': 'iGsBxcX6PtrYUDhd8t0k',
  '30': '9eusHFxdLOuZdBj4QvrA',
  '31': 'oerJQXugtDUhMy1GSvoJ',
};

export default function LegacyPostPage({ params: { legacy } }: Props) {
  redirect('/posts/' + (REDIRECT_IDS[legacy] ?? ''));
}