import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { FLUSH, REGISTER, REHYDRATE, PAUSE, PERSIST, PURGE } from "redux-persist"
import customizationReducer from './customizationReducer';
import auth from 'features/authentication/authReducer';
import groupReducer from 'features/user-management/groups-page/redux/groupSlice';
import userReducer from 'features/user-management/users-page/redux/userSlices';

import calendar from 'features/calender/redux/reducers';
import customerSupportsReducer from 'features/help-center/customer-support/redux/customerSupportSlice';
import technicalSupportsReducer from 'features/help-center/technical-support/redux/technicalSupportSlice';

import chats from 'features/chat/redux/chatSlicees';
import instituteReducer from 'features/institute-management/redux/instituteSlice';
import paymentReducer from 'features/payment-management/payments-page/redux/paymentSlice';
import faqSlice from 'features/faq-management/faqs/redux/faqSlice';
import faqCategorySlice from 'features/faq-management/faq-categories/redux/faqCategorySlice';
import allNotificationSlice from 'features/notification-management/notifications/redux/instituteNotificationSlice';
import subscriptionPlansReducer from 'features/subscription-management/plans/redux/subscriptionPlansSlice';
import subscriptionFeaturesReducer from 'features/subscription-management/features/redux/subscriptionFeaturesSlice';
import openTicketSlice from 'features/ticket-management/your-tickets/redux/open-tickets/yourOpenTicketSlice';
import closedTicketSlice from 'features/ticket-management/your-tickets/redux/closed-tickets/yourClosedTicketSlice';
import locationReducers from 'features/cities/redux/locationSlice'
// ==============================|| REDUX - MAIN STORE ||============================== //

const store = configureStore({
  reducer: {
    locations:locationReducers,
    customization: customizationReducer,
    chat: chats,
    groups: groupReducer,
    users: userReducer,
    institutes: instituteReducer,
    payments: paymentReducer,
    consumerSupports: customerSupportsReducer,
    technicalSupport: technicalSupportsReducer,
    calendar: calendar,
    auth: auth,
    faqCategories: faqCategorySlice,
    faqs: faqSlice,
    instituteNotifications: allNotificationSlice,
    subscriptionPlans: subscriptionPlansReducer,
    subscriptionFeatures: subscriptionFeaturesReducer,
    openTickets: openTicketSlice,
    closedTickets: closedTicketSlice
  },
  middleware:  getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: ['subscriptionPlans/setSubscriptionPlans', 'subscriptionPlans/setLoading',FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      ignoredPaths: ['chat.chats'],
    },
  }),
});
// configureStore(reducer);
const persister = 'Free';

export { store, persister };
