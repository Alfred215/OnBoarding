#See https://aka.ms/containerfastmode to understand how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/aspnet:5.0-buster-slim AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:5.0-buster-slim AS build
WORKDIR /src
COPY ["es.efor.OnBoarding.MainGateway/es.efor.OnBoarding.MainGateway.csproj", "es.efor.OnBoarding.MainGateway/"]
RUN dotnet restore "es.efor.OnBoarding.MainGateway/es.efor.OnBoarding.MainGateway.csproj"
COPY . .
WORKDIR "/src/es.efor.OnBoarding.MainGateway"
RUN dotnet build "es.efor.OnBoarding.MainGateway.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "es.efor.OnBoarding.MainGateway.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "es.efor.OnBoarding.MainGateway.dll"]