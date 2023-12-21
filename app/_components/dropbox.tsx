"use client";
import React, { useEffect, useCallback, useMemo } from 'react';
import Script from 'next/script';
import { get } from 'http';

const DROPBOX_SDK_URL="https://www.dropbox.com/static/api/2/dropins.js"
const DROPBOX_SCRIPT_ID ='dropboxjs'

import Image from "next/image";

declare global {
  interface Window {
    Dropbox: any;
  }
}

export default function DropboxChooser({ children }:any) {

  
const request = async (url: string | URL | Request) =>
{
    const response = await fetch(url,{
      method:"GET"
    })
    const blob = await response.blob();
    console.log(blob);
}



  // const request = (url: string | URL) => {
  //   const xhr = new XMLHttpRequest();
  //   xhr.open('GET', url, true);
  //   xhr.responseType = 'blob';
  
  //   xhr.addEventListener(
  //     'load',
  //     function () {
  //       const buffer = xhr.response;
  //       console.log(buffer);
  //       new File([buffer], "dbox", { type: buffer.type });
  //     },
  //     false
  //   );
  //   xhr.send();
  // };
  
  const onSuccess = (files: { link: any; }[]) => {
    // console.log('onSuccess', files)
    const { link } = files[0];
    console.log(link);
    request(link);
  };

  const onCancel = ()=>{
    window.alert("canceled file");
  }


  var Dropbox:any;
  const options = useMemo(
    () => ({
      success: (files:any) => {
        console.log('success', files);
        onSuccess && onSuccess(files);
      },
      cancel: () => {
        console.log('cancel');
        onCancel && onCancel();
      },
      linkType: 'direct', // or "preview"
      multiselect: true, // 是否支持多选
      folderselect: false, 
    }),
    [onSuccess, onCancel]
  ); 

  const handleChoose = useCallback(() => {
    if (Dropbox) {
       Dropbox.choose(options);
    }
  
  }, [options,Dropbox]);

  return (<>
  <Script
        type="text/javascript"
        src="https://www.dropbox.com/static/api/2/dropins.js"
        id='dropboxjs'
        data-app-key = {process.env.NEXT_PUBLIC_DROPBOX_APP_KEY}
        onLoad={() => {
            Dropbox = window.Dropbox;
            console.log("loaded");
        }}
      />
    <div onClick={handleChoose}>
       <button>dropbox chooser</button>
    </div>
    <button
          className={`w-full block px-3 py-1 text-sm leading-6 text-foreground hover:bg-gray-200 hover:dark:bg-muted flex gap-2 items-center cursor-pointer`}>
    <Image
            alt="google-drive"
            src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHg9IjBweCIgeT0iMHB4IiB3aWR0aD0iNDgiIGhlaWdodD0iNDgiIHZpZXdCb3g9IjAgMCA0OCA0OCI+CjxwYXRoIGZpbGw9IiNGRkMxMDciIGQ9Ik0xNyA2TDMxIDYgNDUgMzAgMzEgMzB6Ij48L3BhdGg+PHBhdGggZmlsbD0iIzE5NzZEMiIgZD0iTTkuODc1IDQyTDE2LjkzOCAzMCA0NSAzMCAzOCA0MnoiPjwvcGF0aD48cGF0aCBmaWxsPSIjNENBRjUwIiBkPSJNMyAzMC4xMjVMOS44NzUgNDIgMjQgMTggMTcgNnoiPjwvcGF0aD4KPC9zdmc+"
            height={16}
            width={16}
          />
          </button>
    </>
  );

}
