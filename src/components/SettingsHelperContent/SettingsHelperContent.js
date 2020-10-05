import React from "react";

import API from "hooks/API";

import {
  Parameter,
  ParameterContainer,
  Button,
} from "./SettingsHelperContent.css";

const SettingsHelperContent = () => {
  const useSettings = API.useSettings();
  const [mutate_PUT_Settings] = API.usePutSettings();

  if (useSettings.isError) {
    return "Fetching date error...";
  } else if (useSettings.isLoading) {
    return "Loading date...";
  }

  const handleChangeSortBy = () => {
    switch (useSettings.data.sortBy) {
      case "Time Intervals":
        mutate_PUT_Settings({
          data: {
            ...useSettings.data,
            sortBy: "Bought most times",
          },
        });
        break;

      case "Bought most times":
        mutate_PUT_Settings({
          data: {
            ...useSettings.data,
            sortBy: "Time Intervals",
          },
        });
        break;

      default:
        break;
    }
  };

  return (
    <div>
      <ParameterContainer>
        <Parameter>Create smart list based on:</Parameter>
        <Button onClick={() => handleChangeSortBy()}>
          {useSettings.data.sortBy}
        </Button>
      </ParameterContainer>
    </div>
  );
};

export default SettingsHelperContent;
