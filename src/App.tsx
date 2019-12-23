import React from 'react';
import { App, View, Page, Navbar, Toolbar, Link, BlockHeader, Block } from 'framework7-react';

const f7params = {
};

export default function () {
  return <App params={f7params}>
    <BlockHeader>Block Header</BlockHeader>
    <Block>
      <p>Here comes paragraph within content block. Donec et nulla auctor massa pharetra adipiscing ut sit amet sem. Suspendisse molestie velit vitae mattis tincidunt. Ut sit amet quam mollis, vulputate turpis vel, sagittis felis. </p>
    </Block>
  </App>
}

