const paths = {
  shield: 'M12 2 21 6v6c0 6-9 11-9 11S3 18 3 12V6ZM8 12l3 3 5-6',
  grid: 'M3 3h7v7H3ZM14 3h7v7h-7ZM3 14h7v7H3ZM14 14h7v7h-7Z',
  folder: 'M3 5h7l2 3h9v12H3Z',
  info: 'M12 11v6M12 7v.2M22 12a10 10 0 1 1-20 0 10 10 0 0 1 20 0Z',
  arrow: 'M4 12h16M14 6l6 6-6 6',
  file: 'M5 2h9l5 5v15H5ZM14 2v6h5M8 12h8M8 16h8',
  clock: 'M12 7v6l4 2M22 12a10 10 0 1 1-20 0 10 10 0 0 1 20 0Z',
}

export default function Icon({ name }) {
  return <svg viewBox="0 0 24 25" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={paths[name]} /></svg>
}
