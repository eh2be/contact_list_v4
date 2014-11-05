require "sinatra/json"
# Homepage (Root path)
get '/' do
  erb :index
end

get '/contacts' do
  @contacts = Contact.all
  json @contacts
end

post '/contacts' do
  @contact = Contact.new(
    firstname:  params[:firstname],
    lastname:   params[:lastname],
    email:      params[:email],
    phone:      params[:phone]
    )
  @contact.save!
  json @contact
end

get '/contacts/:id' do
  @contact = Contact.find params[:id]
  json @contacts
end

post '/contacts/:id' do
  @contact = Contact.find params[:id]
  @contact.destroy
  json @contact
end

# patch