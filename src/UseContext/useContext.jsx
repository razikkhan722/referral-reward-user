import React, { createContext, useState } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [ContextHomeDataAPI, setContextHomeDataAPI] = useState();
  const [ContextFaqsDataAPI, setContextFaqsDataAPI] = useState();
  const [ContextMyRewardDataAPI, setContextMyRewardDataAPI] = useState();
  const [ContextInviteRefferAPI, setContextInviteRefferAPI] = useState();
  const [AuthLocal, setAuthLocal] = useState();
  const [MeterUpdateData, setMeterUpdateData] = useState();
  const [ContextCheckSpecialOffer, ContextsetCheckSpecialOffer] = useState();
  return (
    <UserContext.Provider
      value={{
        ContextHomeDataAPI,
        setContextHomeDataAPI,
        ContextMyRewardDataAPI,
        setContextMyRewardDataAPI,
        ContextFaqsDataAPI,
        setContextFaqsDataAPI,
        AuthLocal,
        setAuthLocal,
        ContextInviteRefferAPI,
        setContextInviteRefferAPI,MeterUpdateData, setMeterUpdateData,
        ContextCheckSpecialOffer, ContextsetCheckSpecialOffer,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
