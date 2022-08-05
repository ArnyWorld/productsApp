FROM node as frontend-build
WORKDIR /fs/frontend

COPY package.json package-lock.json ./
RUN npm install

COPY . ./
RUN npm run build

FROM nginx:1.12-alpine
COPY --from=frontend-build /fs/frontend/dist/productos-app /usr/share/nginx/html
EXPOSE 4100
CMD ["nginx", "-g", "daemon off;"]