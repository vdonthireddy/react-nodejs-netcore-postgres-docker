FROM mcr.microsoft.com/dotnet/sdk:5.0 as build
WORKDIR /src
COPY micro-service.csproj .
RUN dotnet restore
COPY . .
RUN dotnet publish -c release -o /output

FROM mcr.microsoft.com/dotnet/aspnet:5.0
WORKDIR /app
COPY --from=build /output .
ENV ASPNETCORE_URLS=http://+:7778
EXPOSE 7778
LABEL NAME='Vijay Donthireddy'
LABEL VERSION="1.0"
ENTRYPOINT [ "dotnet", "micro-service.dll" ]