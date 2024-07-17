import { useState } from "react";
// import "src/bootstrap.css";

const App = () => {
  const [inputData, setInputData] = useState();
  const [api, setApi] = useState([]);
 
  const handle = (e) => {
    setInputData(e.target.value);
  };
  // input handle data end

  // button logic start {also api call}

  const show = async () => {
    try {
      const data = await fetch(
        `https://api.dictionaryapi.dev/api/v2/entries/en/${inputData}`
      );
      const res = await data.json();
      console.log(res[0].phonetics[1].audio);
      // setAudio(res[0].phonetics[1].audio);
      setApi(res);
    } catch (error) {
      alert("No any data found");
    }
  };

  return (
    <div>
      <div className=" bg-slate-800 text-white">
        <div className=" grid centre pt-20 pb-20 grid-rows-2 place-content-center  ">
          <h1 className="centre text-5xl mb-7 ">Word Hunting :) </h1>
          <div>
            <input
              className="w-[250px] p-2 text-lg border border-green-600 border-4 text-gray-900"
              type="text"
              placeholder="enter your word"
              onChange={handle}
            />
          </div>
          <div>
            <button
              className="w-[100px] text-white outline outline-offset-4 rounded-lg hover:outline-offset-2 hover:bg-red-100 hover:text-gray-900 h-[30px] text-white mt-4 bg-slate-600"
              onClick={show}
            >
              click{" "}
            </button>
          </div>
        </div>
        <div className="main">
          <div className="m-4 ">
            {api.map((i, curElem) => {
              return (
                <>
                  <div
                    key={curElem}
                    className=" mt-2 mb-2  border border-2 rounded-lg p-3 border-red"
                  >
                    <div className=" text-gray  text-3xl">{i.word} </div>
                    <div className=" mt-0.1 text-4">{i.phonetic}</div>
                    <div className="meaning mt-3">
                      {
                        // console.log(mean.meanings);
                        i.meanings.map((def) => {
                          console.log(def.antonyms);
                          return (
                            <>
                              {def.antonyms.map((ant) => {
                                return (
                                  <>
                                    <div className="main flex p-2 border rounded-lg border-blue-500 text-slate-800 bg-sky-100 mt-3">
                                      <strong className="text-sky">
                                        Antonyms :
                                      </strong>{" "}
                                      {ant}{" "}
                                    </div>
                                  </>
                                );
                              })}
                              <hr className="bg-slate-900 m-3" />
                              {def.synonyms.map((syn) => {
                                return (
                                  <>
                                    <div className="main p-2 border rounded-lg border-green-500 text-slate-800 bg-red-100 mt-3">
                                      <strong className="text-sky">
                                        Synonyms :
                                      </strong>{" "}
                                      {syn}{" "}
                                    </div>
                                  </>
                                );
                              })}
                              <hr className="bg-slate-900 m-5" />
                              {def.definitions.map((mainDef) => {
                                // console.log(mainDef.definition)
                                return (
                                  <>
                                    <div className="main flex border border-1 border-green-500 p-2 mt-2 rounded-lg">
                                      <div className="text-xl underline decoration-sky-500">
                                        Definition{" "}
                                      </div>
                                      <div className="mai">
                                        <div className="ml-2 mt-1">
                                          {" "}
                                          : {mainDef.definition}
                                        </div>
                                        <div>
                                          <strong>Example</strong>{" "}
                                          <span className="italic ">
                                            {" "}
                                            :{" "}
                                            {mainDef.example === ""
                                              ? "No Example"
                                              : mainDef.example}
                                          </span>
                                        </div>
                                      </div>
                                    </div>
                                  </>
                                );
                              })}
                            </>
                          );
                        })
                      }
                    </div>
                  </div>
                </>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
