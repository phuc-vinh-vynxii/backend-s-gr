import UserRoute from "./user.route.js";
export default (app) => {
    const userRoute = new UserRoute();
    app.use("/users", userRoute.getRouter());
};
