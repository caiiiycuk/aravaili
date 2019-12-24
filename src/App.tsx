import { App, Block, BlockHeader, Link, Navbar, Page, Toolbar, View, BlockTitle, Card, CardContent, CardHeader, Button, CardFooter } from "framework7-react";
import { Router } from "framework7/modules/router/router";
import React, { Children, useEffect, useState } from "react";
import ReactMarkdown, { renderers } from "react-markdown";

import "./css/app.css";
import DataTableComponent from "framework7/components/data-table/data-table";

const state = {
  key: 0,
  header: null,
};

function nextKey() {
  state.key++;
  return state.key;
}

function paragraphRenderer(props: any) {
  if (props.children[0].type === codeRenderer) {
    return props.children[0];
  }

  let className = "";
  let image = "";
  if (props.children[0].type === imageRender) {
    className = "demo-card-header-pic";
    image = props.children[0].props.src;
  }

  return <Card className={className}>
    <CardHeader style={className.length > 0 ?
      {
        alignItems: "flex-end",
        backgroundImage: "url(" + image + ")",
      } : {}}>{state.header}</CardHeader>
    <CardContent>{props.children}</CardContent>
  </Card>;
}

function imageRender(props: any) {
  return null;
}

function codeRenderer(props: any) {
  return null;
}

function headingRenderer(props: any) {
  if (props.level === 1) {
    return <Navbar><Link href="/">{props.children}</Link></Navbar>;
  }

  state.header = props.children;
  return null;
}

function textRenderer(props: any) {
  const elements = [];
  for (const next of props.children.split("\n")) {
    elements.push(<p key={nextKey()}>{next}</p>);
  }
  return <div>{elements}</div>;
}

function linkRenderer(props: any) {
  return <Button style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }} outline={true} href={props.href}>{props.children}</Button>;
}

function tableRenderer(props: any) {
  return <div className="data-table card"><table>{props.children}</table></div>;
}

export default function() {
  const [routes, setRoutes] = useState<Router.RouteParameters[]>([]);
  useEffect(() => {
    const request = new XMLHttpRequest();
    request.open("GET", "/aravaili.md");
    request.onreadystatechange = (ev) => {
      if (request.readyState === 4 && request.status === 200) {
        const markdown = request.responseText;
        const pages = markdown.split("`page:");
        const parsedRoutes = [];

        for (const next of pages) {
          if (next.length === 0) {
            continue;
          }

          const pageStart = next.indexOf("`");
          if (pageStart === -1) {
            continue;
          }

          const md = next.substr(pageStart + 1);
          const url = next.substr(0, pageStart);

          parsedRoutes.push({
            path: url,
            component: () => {
              return <Page key={url}>
                <ReactMarkdown source={md}
                  renderers={{
                    paragraph: paragraphRenderer,
                    heading: headingRenderer,
                    inlineCode: codeRenderer,
                    image: imageRender,
                    text: textRenderer,
                    link: linkRenderer,
                    table: tableRenderer,
                  }} />
              </Page>;
            },

          });
        }
        setRoutes(parsedRoutes);
      }
    };
    request.send();
  }, []);

  if (routes.length === 0) {
    return <div></div>;
  }

  const f7params = {
    theme: "auto",
    routes,
  };

  return <App params={f7params}>
    <View main url="/" pushState={true} />
  </App>;
}
