# Health Beat

## Opis

Aplikacje webowa pozwalająca  zalogowanym użytkownikom na wprowadzanie pomiarów ciśnienia krwi w danym dniu i o konkretnej porze dnia. Aplikacja została stworzona z w sposób umożliwiający zapisywanie danych pomimo braku połączenia z internetem (w trybie offline przeglądarki, który należy ręcznie włączyć). Po ponownym nawiązaniu połączenia (powrotu do trybu online) dane są automatyczne synchronizowane ze zdalną bazą danych. Istotnym aspektem jest wymóg bycia wcześniej zalogowanym aby móc działać w trybie offline - wymagana jest obecność tokenu uwierzytelnienia w localStorage.  

Przykładowe konto użytkownika:  
email: example7@email.com  
hasło: password
  

### Uwagi do trybu offline

Tryb offline zgodnie z wymaganiami określonymi w poleceniu rozumiany jest jako ręczne włączenie takiego trybu w przegladarce - mechanizm przełączania trybów oparty jest o eventy online/offline oraz zmienną navigator.onLine, które nie do końca i nie we wszytskich przeglądarkach radzą sobie z wykryciem np. odłączenia kabla.

### Backend 

Część backendowa aplikacji znajduje się w osobnym [repozytorium](https://github.com/Fadikk367/Health-Beat-server).


## Interfejs użytkownika
### Strona główna
![Strona główna aplikacji](https://fadikktestbucket.s3.eu-central-1.amazonaws.com/assets/1.png)

### Profil zalogowanego użytkownika
![Profile użytkownika](https://fadikktestbucket.s3.eu-central-1.amazonaws.com/assets/2.png)


### Lista dodanych pomiarów
![Profile użytkownika](https://fadikktestbucket.s3.eu-central-1.amazonaws.com/assets/3.png)

## Stack technologiczny

* Frontend - React  + Typescript

* Backend - Express + Typescript

* Baza danych - MongoDB

### Wybrane użyte biblioteki
* chartjs - biblioteka do tworzenia wykresów

* react-hook-form - obsługa formularzy z walidacją po stronie klienta

* material-ui - biblioteka gotowych komponentów Reactowych (wykorzystana na najniższym poziomie abstrakcji - przyciski, pola formularzy, date picker)

* styled-components

* react-router-dom

### Hosting
Serwerowa część aplikacji umieszczona została na platformie AWS w usłudze Elastic Beanstalk. Frontend aplikacji serwowany jest z usługi S3 jako static web hosting. Baza MongoDB hostowana jest w oficjalnej usłudze chmurowej MongoDB Atlas.

## Implementacja 

Struktura API zaprojektowana została zgodnie z regułami REST - api jest bezstanowe a konkretne zasoby zdefiniowane są poprzez url oraz metodę HTTP. Uwierzytelnienie oparte jest o mechanizm JWT.

Dostępne endpointy:

- POST /auth/login
- POST /auth/register

- POST /measurements - dodanie nowego pomiaru dla użytkownika (chroniony)
- POST /measurements/sync -synchronizacja danych lokalnych ze zdalną bazą danych (chroniony)
- GET /measurements - pobranie wszystkich pomiarów ciśnienia krwi użytkownika (chroniony)
- DELETE /measurements/:id - usunięcie konkretnego pomiary o id zawartym jako url param (chroniony)


### Uwierzytelnienie i autoryzacja 
Obsługa uwierzytelniania użytkowników zaimplementowana została z wykorzystaniem technologii JWT (JSON Web Token). Podpisany przez serwer token przechowywany jest w localStorage i dołączany jest do każdego zapytania zalogowanego użytkownika w celu potwierdzenia jego tożsamości. Po stronie serwera za sprawdzanie tożsamości klientów i odrzucanie nieuprawnionych użytkowników odpowiedzialny jest middleware authUser który dołączany jest do strzeżonych endpointów REST API.

### Obsługa trybu offline
Mechanizm obsługi trybów online/offline zaprojektowany został zgodnie z zasadą ostatnią zasadą SOLID czyli dependency inversion poprzez mechanizm dependency injection.  tym celu zdefiniowany został interfejs biznesowy **MeasurementService** określający akcje, które użytkownik może wykonać na rzecz swoich danych:

```typescript
export  interface  MeasurementService {
	addOne(measurement: Measurement): Promise<Measurement>;
	fetchAll(): Promise<Measurement[]>;
	deleteOne(id: string): Promise<string>;
}
```
 Ten interfejs jest implementowany przed dwa serwisy - **MeasurementOfflineService**  oraz **MeasurementOnlineService** przy czym serwis służący do pracy offline zamiast komunikacji ze zdalnym serwerem, który zapisuje dane w bazie danych, oparty jest na lokalnym mechanizmie wbudowanym w przeglądarki - localStorage. Kluczowy moment zachodzi w Komponencie wyższego rzędu (HOC) NetworkDetector, który opakowuje właściwą aplikację Providerem kontekstu reactowego (React Context API) z wstrzykniętym odpowiednim serwisem w zależności od sytuacji:

```typescript
return (
	<AuthProvider>
		<MeasurementProvider
			measurementService={
			isOnline 
			? measurementOnlineService 
			: measurementOfflineService}
		>
			<App/>
		</MeasurementProvider>
	</AuthProvider>
)
```
Z racji identycznego interfejsu obu serwisów ani sam kontekst ani żadna inna część aplikacji nie musi i nie wie w jakim trybie się znajduje i wywołuje zawsze te same metody, które dopiero na najniższym poziomie abstrakcji czyli w konkretnej implementacji serwisu wykazują się specyficznym dla trybu działaniem. W efekcie użytkownik nie odczuwa przejścia pomiędzy trybami lub nie widzi różnicy w korzystaniu z aplikacji w trybie offline (z dokładnością do braku danych z bazy w chmurze w trybie offline).


### Walidacja danych po stronie klienta
Po stronie klienta poprawność danych sprawdzana jest przy pomocy biblioteki react-hook-form, która sprawdza zdefiniowane przez nas warunki dla każdego z pól formularza i zwraca odpowiednie komunikaty, które następnie w prosty sposób możemy wyświetlić. 
```typescript
const  inputRegister = {
	firstName:  register({
		required:  'First name is required',
		minLength: { value:  2, message:  'Minimum 2 characters' },
		maxLength: { value:  16, message:  'Maximum 16 characters' },
	}),
	lastName:  register({
		required:  'Last name is required',
		minLength: { value:  2, message:  'Minimum 2 characters' },
		maxLength: { value:  16, message:  'Maximum 16 characters' },
	}),
	email:  register({
		required:  'Email is required',
		minLength: { value:  4, message:  'Minimum 4 characters' },
		pattern: { value: /(.+)@(.+){2,}\.(.+){2,}/, message:  'Invalid email format'}
	}),
	password:  register({
		required:  'Password is required',
		minLength: { value:  8, message:  'Minimum 8 characters' },
		maxLength: { value:  16, message:  'Maximum 16 characters' },
	})
}
```

Warto nadmienić, iż użyta biblioteka cechuje się świetną wydajnością (najmniejsza ilość przerenderowań komponentów spośród czołówki bibliotek obsługujących formularze w React) z racji wykorzystania referencji.


### Walidacja danych po stronie serwera
Tutaj poprawności danych strzeże duet dwóch bibliotek - class-transformer i class-validator działający w middleware validateBodyAs. Reguły poprawności danych definiujemy poprzez odpowiednie dekoratory dołączane do pól obiektów transferu danych (DTO - Data Transfer Object). 
```typescript
export  default  class  AuthCredentialsDto {
	@Expose()
	@IsString({ message:  'missing email' })
	public  email: string;

	@Expose()
	@IsString({ message:  'missing password' })
	public  password: string;

	constructor(email: string, password: string) {
		this.email = email;
		this.password = password;
	}
}
```
Spodziewając się konkretnej struktury danych w body zapytania poprzedzamy handler middlewarem z przekazanym odpowiednym typem DTO:
```typescript
this.router.post('/login', validateBodyAs(AuthCredentialsDto), this.signIn);
```
 W środku zawartość body pochodząca od klienta transformowana jest na ten obiekt DTO i następnie podawana jest walidacji. W przypadku niepowodzenia, tworzony jest zbiorczy komunikat, który zostaje wysłany w odpowiedzi z kodem 400 (Bad Request)

### Warstwa abstrakcji w dostępie do danych po stronie serwera
W tym miejscu użyte zostały wzorce repozytorium oraz singletonu - każde z dwóch repozytoriów zaimplementowane jest jak singleton aby jego instancja tworzona była tylko raz i była współdzielona przez kontrolery. Repozytoria mają zaimplementowane metody pozwalające na podstawowe operacje na danych zasobach. Kontrolery nie wiedzą nic o bazie danych ani nie mają do niej bezpośredniego dostępu a jedynie wywołują odpowiednie metody z używanych repozytoriów przekazując do nich niezbędne informacje takie jak obiekty DTO czy identyfikatory użytkowników.
  

## Obsługa przeglądarek

Kod aplikacji klienta został skompilowany do standardu ES5 a więc wszystkie wersje przeglądarek wspierające ten standard powinny prawidłowo obsługiwać aplikację. Naturalnie wymogiem działania aplikacji jest obsługa języka JavaScript. 

Do pracy w trybie offline zalecana jest przeglądarka Mozilla Firefox, która domyślnie cachuje odwiedzone strony i wczytuje je bezproblemowo w momencie włączenia trybu offline.




## Źródła

*  [Dokumentacja MDN](https://developer.mozilla.org/pl/)
*  [Dokumentacja TypeScript](https://www.typescriptlang.org/docs)
*  [Dokumentacja React](https://reactjs.org/docs/getting-started.html)
*  [Dokumentacja MongoDB](https://docs.mongodb.com/drivers/node/)

### Grafiki
* [People vector created by rawpixel.com - www.freepik.com](https://www.freepik.com/vectors/people)
* [Placeholder zdjecia użytkownika](https://www.cobdoglaps.sa.edu.au/wp-content/uploads/2017/11/placeholder-profile-sq.jpg)
* [Logo](https://www.flaticon.com/free-icon/cardiogram_3004458?term=heart&page=1&position=66&page=1&position=66&related_id=3004458&origin=search)
