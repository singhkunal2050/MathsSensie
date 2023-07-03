import React, { useCallback, useRef, useEffect, useState } from 'react';
import { toBlob, toPng } from 'html-to-image';
import axios from 'axios';
import Image from 'next/image';

const Editor: React.FC = () => {
  const ref = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [drawMode, setDrawMode] = useState(true);
  const [eraserMode, setEraserMode] = useState(false);
  const [lastX, setLastX] = useState(0);
  const [lastY, setLastY] = useState(0);
  const [strokeWidth, setStrokeWidth] = useState(5);
  const [eraserWidth, setEraserWidth] = useState(40);
  const [isSmoothScribbling, setIsSmoothScribbling] = useState(false);
  const [textModeEnabled, setTextModeEnabled] = useState(false);
  const [text, setText] = useState('');
  const [textY, setTextY] = useState('');
  const [textX, setTextX] = useState('');
  const [dropDownOpen, setDropDownOpen] = useState(false);

  function blobToString(blob:any) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        resolve(reader.result);
      };
      reader.onerror = reject;
      reader.readAsText(blob);
    });
  }

  const copyToClipboard = useCallback(() => {
    if (ref.current === null) {
      return;
    }

    toPng(ref.current)
      .then((dataUrl) => {
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard
            .writeText(dataUrl)
            .then(() => {
              console.log('Image copied to clipboard!');
            })
            .catch((error) => {
              console.log('Error copying to clipboard:', error);
            });
        } else {
          const tempInput = document.createElement('textarea');
          tempInput.value = dataUrl;
          document.body.appendChild(tempInput);
          tempInput.select();
          document.execCommand('copy');
          document.body.removeChild(tempInput);
          console.log('Image copied to clipboard (fallback)');
        }
      })
      .catch((error) => {
        // Handle error
        console.log(error);
      });
  }, [ref]);

  const downloadImage = useCallback(() => {
    if (ref.current === null) {
      return;
    }

    toPng(ref.current)
      .then((dataUrl) => {
        const link = document.createElement('a');
        link.download = 'my-image-name.png';
        link.href = dataUrl;
        link.click();
      })
      .catch((error) => {
        // Handle error
        console.log(error);
      });
  }, [ref]);

  const sendToBackendAPI = useCallback(() => {
    if (ref.current === null) {
      return;
    }

    toBlob(ref.current)
      .then(async (blob)=>{
        if(blob){
          const stringBlob = await blobToString(blob);
          console.log(stringBlob);
          const payload = {
            user_query: 'image selected',
            meta: {
              context : 'doubt'
            },
            image_blob: stringBlob
          };
          axios
            .post('https://test-maths.free.beeceptor.com/image', payload)
            .then((response) => {
              // Handle successful response
              console.log(response.data);
            })
            .catch((error) => {
              // Handle error
              console.log(error);
            });
          }
      })
      .catch((error) => {
        // Handle error
        console.log(error);
      });
  }, [ref]);

  const startDrawing = useCallback((event: MouseEvent | TouchEvent) => {
    setIsDrawing(true);
    let currentX,currentY;
    if ('touches' in event) {
      currentX = event.touches[0].clientX;
      currentY = event.touches[0].clientY;
    }else{
      currentX = event.clientX;
      currentY = event.clientY;
    }

    setLastX(currentX - ref.current!.offsetLeft);
    setLastY(currentY - ref.current!.offsetTop);
  }, []);

  const clearCanvas = useCallback(() => {
    if (ref.current) {
      const canvas = ref.current;
      const context = canvas.getContext('2d');
      if (context) {
        context.clearRect(0, 0, canvas.width, canvas.height);
      }
    }
  }, []);

  const draw = useCallback(
    (event: MouseEvent | TouchEvent) => {
      if (!isDrawing) {
        return;
      }
      if (textModeEnabled) {
        return;
      }
      const canvas = ref.current;
      const context = canvas!.getContext('2d');

      if (context) {
        let currentX,currentY;
        if ('touches' in event) {
          currentX = event.touches[0].clientX - canvas!.offsetLeft;
          currentY = event.touches[0].clientY - canvas!.offsetLeft;
        }else{
          currentX = event.clientX - canvas!.offsetLeft;
          currentY = event.clientY - canvas!.offsetTop;
        }

        context.beginPath();
        context.moveTo(lastX, lastY);

        if (isSmoothScribbling) {
          const centerX = (lastX + currentX) / 2;
          const centerY = (lastY + currentY) / 2;
          context.quadraticCurveTo(lastX, lastY, centerX, centerY);
        } else {
          context.lineTo(currentX, currentY);
        }

        if (eraserMode) {
          context.strokeStyle = '#202020'; // Set the eraser color (white)
          context.lineWidth = eraserWidth; // Set the eraser size
        } else {
          context.strokeStyle = 'white'; // Set the drawing color (black)
          context.lineWidth = strokeWidth; // Set the drawing size
        }
        context.stroke();

        setLastX(currentX);
        setLastY(currentY);
      }
    },
    [isDrawing, lastX, lastY, strokeWidth, isSmoothScribbling]
  );


  const handleTextInputPosition = (event: MouseEvent | TouchEvent) => {
    if (textModeEnabled && ref.current) {
      const canvas = ref.current;
      const canvasRect = canvas.getBoundingClientRect();
      let clientX, clientY;
      if ('touches' in event) {
        clientX = event.touches[0].clientX;
        clientY = event.touches[0].clientY;
      } else {
        clientX = event.clientX;
        clientY = event.clientY;
      }
      const textX = clientX - canvasRect.left;
      const textY = clientY - canvasRect.top;
      setTextX(textX+"");
      setTextY(textY+"");
    }
  };

  const stopDrawing = useCallback(() => {
    setIsDrawing(false);
  }, []);

  useEffect(() => {
    if (ref.current) {
      const canvas = ref.current;
      canvas.addEventListener('mousedown', startDrawing);
      canvas.addEventListener('mousemove', draw);
      canvas.addEventListener('mouseup', stopDrawing);
      canvas.addEventListener('mouseout', stopDrawing);
      canvas.addEventListener('touchstart', startDrawing);
      canvas.addEventListener('touchmove', draw);
      canvas.addEventListener('touchend', stopDrawing);
      canvas.addEventListener('touchcancel', stopDrawing);

      // Text 
      canvas.addEventListener('touchstart', handleTextInputPosition);
      canvas.addEventListener('touchmove', handleTextInputPosition);
      canvas.addEventListener('touchend', handleTextInputPosition);
      canvas.addEventListener('touchcancel', handleTextInputPosition);

      return () => {
        canvas.removeEventListener('mousedown', startDrawing);
        canvas.removeEventListener('mousemove', draw);
        canvas.removeEventListener('mouseup', stopDrawing);
        canvas.removeEventListener('mouseout', stopDrawing);
        canvas.removeEventListener('touchstart', startDrawing);
        canvas.removeEventListener('touchmove', draw);
        canvas.removeEventListener('touchend', stopDrawing);
        canvas.removeEventListener('touchcancel', stopDrawing);
      };
    }
  }, [startDrawing, draw, stopDrawing]);

  const toggleEraser = (e:any) => {
    setDrawMode(false);
    setEraserMode(!eraserMode);
  }

  const enableDrawMode = (e:any) => {
    setDrawMode(true);
    setTextModeEnabled(false);
    setEraserMode(false);
  }

  const enableTextMode = (e:any) => {
    if(!textModeEnabled){
      setTextModeEnabled(true);
      setDrawMode(false);
      setEraserMode(false);
    }else{
      setTextModeEnabled(false);
      setDrawMode(true);
      setEraserMode(false);
    }
  }

  const toggleDropDown = (e:any) =>{
    setDropDownOpen(!dropDownOpen);
  }

  return (
    <>
      <section
        id="tools-sidebar"
        className="bg-gray-800 min-w-[10vw] p-2 dark:text-white"
      >
        <div className="tools-header pb-2 font-bold">Tools</div>
        <div className="grid grid-cols-2 gap-2">
          <div
            id="stroke-btn"
            onClick={enableDrawMode}
            className={`cursor-pointer tool flex justify-center items-center   aspect-square shadow-sm shadow-gray-600 ${
              drawMode ? 'bg-black' : ''
            }`}
          >
            |
          </div>
          <div
            id="erase-btn"
            onClick={toggleEraser}
            className={`cursor-pointer tool flex justify-center items-center   aspect-square shadow-sm shadow-gray-600 ${
              eraserMode ? 'bg-black' : ''
            }`}
          >
            o
          </div>
          <div
            id="text-btn"
            onClick={enableTextMode}
            className={`cursor-pointer tool flex justify-center items-center   aspect-square shadow-sm shadow-gray-600 ${
              textModeEnabled ? 'bg-black' : ''
            }`}
          >
            A
          </div>
          <div
            onClick={copyToClipboard}
            className="cursor-pointer tool flex justify-center items-center   aspect-square shadow-sm shadow-gray-600"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="dark:fill-white"
              height="20"
              viewBox="0 -960 960 960"
              width="48"
            >
              <path d="M180-81q-24 0-42-18t-18-42v-603h60v603h474v60H180Zm120-120q-24 0-42-18t-18-42v-560q0-24 18-42t42-18h440q24 0 42 18t18 42v560q0 24-18 42t-42 18H300Zm0-60h440v-560H300v560Zm0 0v-560 560Z" />
            </svg>
          </div>
          <div
            onClick={downloadImage}
            className="cursor-pointer tool flex justify-center items-center   aspect-square shadow-sm shadow-gray-600"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="dark:fill-white"
              height="20"
              viewBox="0 -960 960 960"
              width="48"
            >
              <path d="M220-160q-24 0-42-18t-18-42v-143h60v143h520v-143h60v143q0 24-18 42t-42 18H220Zm260-153L287-506l43-43 120 120v-371h60v371l120-120 43 43-193 193Z" />
            </svg>
          </div>
          <div
            onClick={sendToBackendAPI}
            className="cursor-pointer tool flex justify-center items-center   aspect-square shadow-sm shadow-gray-600"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="dark:fill-white"
              height="20"
              viewBox="0 -960 960 960"
              width="48"
            >
              <path d="M240-80v-172q-57-52-88.5-121.5T120-520q0-150 105-255t255-105q125 0 221.5 73.5T827-615l55 218q4 14-5 25.5T853-360h-93v140q0 24.75-17.625 42.375T700-160H600v80h-60v-140h160v-200h114l-45-180q-24-97-105-158.5T480-820q-125 0-212.5 86.5T180-522.46q0 64.417 26.324 122.392Q232.649-342.092 281-297l19 18v199h-60Zm257-370Zm-17 130q17 0 28.5-11.5T520-360q0-17-11.5-28.5T480-400q-17 0-28.5 11.5T440-360q0 17 11.5 28.5T480-320Zm-30-128h61q0-25 6.5-40.5T544-526q18-20 35-40.5t17-53.5q0-42-32.5-71T483-720q-40 0-72.5 23T365-637l55 23q7-22 24.5-35.5T483-663q22 0 36.5 12t14.5 31q0 21-12.5 37.5T492-549q-20 21-31 42t-11 59Z" />
            </svg>
          </div>
          <div
            onClick={clearCanvas}
            className="cursor-pointer tool flex justify-center items-center   aspect-square shadow-sm shadow-gray-600"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="dark:fill-white"
              height="20"
              viewBox="0 -960 960 960"
              width="48"
            >
              <path d="M261-120q-24.75 0-42.375-17.625T201-180v-570h-41v-60h188v-30h264v30h188v60h-41v570q0 24-18 42t-42 18H261Zm438-630H261v570h438v-570ZM367-266h60v-399h-60v399Zm166 0h60v-399h-60v399ZM261-750v570-570Z" />
            </svg>
          </div>
          {/* <div className="tool border flex justify-center items-center dark:border-white ">
            A
          </div>
          <div className="tool border flex justify-center items-center dark:border-white ">
            A
          </div>
          <div className="tool border flex justify-center items-center dark:border-white ">
            A
          </div> */}
        </div>
      </section>
      <section className="flex-1 flex flex-col">
        <div className="action-buttons flex justify-center items-center gap-2 p-2">
          <input
            type="number"
            onChange={(e) => setStrokeWidth(+e.target.value)}
            id="stroke_width"
            className="bg-gray-50 border border-gray-300 text-gray-900 max-w-[140px] text-sm rounded-lg focus:ring-gray-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-grayx-500"
            placeholder="Stroke Width"
            required
          />
          <div className="drop-down relative">
            <button
              id="dropdownDefaultButton"
              onClick={toggleDropDown}
              data-dropdown-toggle="dropdown"
              className="text-white bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center"
              type="button"
            >
              Maths Sensie{' '}
              <svg
                className="w-4 h-4 ml-2"
                aria-hidden="true"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 9l-7 7-7-7"
                ></path>
              </svg>
            </button>
            <div
              id="dropdown"
              className={`z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 absolute ${
                dropDownOpen ? 'block' : 'hidden'
              }`}
            >
              <ul
                className="py-2 text-sm text-gray-700 dark:text-gray-200"
                aria-labelledby="dropdownDefaultButton"
              >
                <li>
                  <a
                    href="#"
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    Kids Sensie
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    User Group 2
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    User Group 3
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    User Group 4
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="flex justify-center self-stretch p-4">
          <canvas
            className="bg-[#202020] rounded-lg"
            ref={ref}
            id="drawing-board"
            width={1200}
            height={700}
          ></canvas>
          {/* <input
              className='border border-white'
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              style={{
                position: 'absolute',
                top: `${textY}px`,
                left: `${textX}px`,
                display: textModeEnabled ? 'block' : 'flex',
              }}
            /> */}
        </div>
      </section>
    </>
  );
};

export default Editor;
