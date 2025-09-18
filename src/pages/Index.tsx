import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import Icon from '@/components/ui/icon';

interface Perfume {
  id: number;
  name: string;
  brand: string;
  price: number;
  family: string;
  image: string;
  description: string;
  notes: string[];
}

const perfumes: Perfume[] = [
  {
    id: 1,
    name: "Rose Garden",
    brand: "Chanel",
    price: 8500,
    family: "Цветочные",
    image: "/img/27d6d8a3-f802-4794-806f-ededa8a39e7a.jpg",
    description: "Нежный аромат розы с нотами пиона",
    notes: ["Роза", "Пион", "Мускус"]
  },
  {
    id: 2,
    name: "Lavender Dreams",
    brand: "Dior",
    price: 7200,
    family: "Цветочные",
    image: "/img/21787f94-2f0c-4173-b097-a76587334373.jpg",
    description: "Романтичный букет с лавандой",
    notes: ["Лаванда", "Жасмин", "Ваниль"]
  },
  {
    id: 3,
    name: "Amber Glow",
    brand: "Tom Ford",
    price: 12000,
    family: "Восточные",
    image: "/img/27d6d8a3-f802-4794-806f-ededa8a39e7a.jpg",
    description: "Теплый амбровый аромат",
    notes: ["Амбра", "Сандал", "Роза"]
  },
  {
    id: 4,
    name: "Fresh Breeze",
    brand: "Hermès",
    price: 9500,
    family: "Свежие",
    image: "/img/21787f94-2f0c-4173-b097-a76587334373.jpg",
    description: "Свежий морской бриз",
    notes: ["Морские ноты", "Цитрус", "Мята"]
  }
];

const brands = [...new Set(perfumes.map(p => p.brand))];
const families = [...new Set(perfumes.map(p => p.family))];

export default function Index() {
  const [selectedBrand, setSelectedBrand] = useState<string>("Все");
  const [selectedFamily, setSelectedFamily] = useState<string>("Все");
  const [selectedPrice, setSelectedPrice] = useState<string>("Все");
  const [activeTab, setActiveTab] = useState("catalog");

  const filteredPerfumes = perfumes.filter(perfume => {
    const brandMatch = selectedBrand === "Все" || perfume.brand === selectedBrand;
    const familyMatch = selectedFamily === "Все" || perfume.family === selectedFamily;
    const priceMatch = selectedPrice === "Все" || 
      (selectedPrice === "до 8000" && perfume.price < 8000) ||
      (selectedPrice === "8000-10000" && perfume.price >= 8000 && perfume.price <= 10000) ||
      (selectedPrice === "от 10000" && perfume.price > 10000);
    
    return brandMatch && familyMatch && priceMatch;
  });

  const reviews = [
    { name: "Анна", rating: 5, text: "Потрясающий аромат! Держится весь день", perfume: "Rose Garden" },
    { name: "Мария", rating: 5, text: "Очень нежный и романтичный", perfume: "Lavender Dreams" },
    { name: "Елена", rating: 4, text: "Качество отличное, быстрая доставка", perfume: "Amber Glow" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted to-secondary/20">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-border/50 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Icon name="Sparkles" className="text-primary" size={28} />
              <h1 className="text-2xl font-bold text-foreground">Parfumerie</h1>
            </div>
            <nav className="hidden md:flex items-center space-x-6">
              <Button 
                variant={activeTab === "catalog" ? "default" : "ghost"} 
                onClick={() => setActiveTab("catalog")}
                className="bg-primary hover:bg-primary/90"
              >
                Каталог
              </Button>
              <Button 
                variant={activeTab === "delivery" ? "default" : "ghost"} 
                onClick={() => setActiveTab("delivery")}
                className="bg-primary hover:bg-primary/90"
              >
                Доставка
              </Button>
              <Button 
                variant={activeTab === "reviews" ? "default" : "ghost"} 
                onClick={() => setActiveTab("reviews")}
                className="bg-primary hover:bg-primary/90"
              >
                Отзывы
              </Button>
              <Button 
                variant={activeTab === "contacts" ? "default" : "ghost"} 
                onClick={() => setActiveTab("contacts")}
                className="bg-primary hover:bg-primary/90"
              >
                Контакты
              </Button>
            </nav>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="icon">
                <Icon name="Search" size={18} />
              </Button>
              <Button variant="outline" size="icon">
                <Icon name="Heart" size={18} />
              </Button>
              <Button variant="outline" size="icon">
                <Icon name="ShoppingBag" size={18} />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          
          {/* Catalog Tab */}
          <TabsContent value="catalog" className="space-y-8">
            {/* Hero Section */}
            <section className="text-center py-12">
              <h2 className="text-4xl md:text-6xl font-bold text-foreground mb-4 animate-fade-in">
                Мир Ароматов
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto animate-fade-in">
                Откройте для себя изысканную коллекцию парфюмерии. 
                Каждый аромат - это история, рассказанная через ноты.
              </p>
            </section>

            {/* Filters */}
            <section className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-border/30">
              <h3 className="text-xl font-semibold mb-4 flex items-center">
                <Icon name="Filter" className="mr-2" size={20} />
                Фильтры
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Бренд</label>
                  <Select value={selectedBrand} onValueChange={setSelectedBrand}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Все">Все бренды</SelectItem>
                      {brands.map(brand => (
                        <SelectItem key={brand} value={brand}>{brand}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Ароматная семья</label>
                  <Select value={selectedFamily} onValueChange={setSelectedFamily}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Все">Все семьи</SelectItem>
                      {families.map(family => (
                        <SelectItem key={family} value={family}>{family}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Цена</label>
                  <Select value={selectedPrice} onValueChange={setSelectedPrice}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Все">Все цены</SelectItem>
                      <SelectItem value="до 8000">До 8 000 ₽</SelectItem>
                      <SelectItem value="8000-10000">8 000 - 10 000 ₽</SelectItem>
                      <SelectItem value="от 10000">От 10 000 ₽</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </section>

            {/* Products Grid */}
            <section>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredPerfumes.map(perfume => (
                  <Card key={perfume.id} className="group hover:shadow-xl transition-all duration-300 border-0 bg-white/70 backdrop-blur-sm animate-scale-in">
                    <CardHeader className="p-4">
                      <div className="aspect-square rounded-xl overflow-hidden bg-gradient-to-br from-secondary/20 to-muted/20">
                        <img 
                          src={perfume.image} 
                          alt={perfume.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                      <Badge variant="secondary" className="mb-2 bg-secondary/80">
                        {perfume.family}
                      </Badge>
                      <CardTitle className="text-lg mb-1">{perfume.name}</CardTitle>
                      <p className="text-sm text-muted-foreground mb-2">{perfume.brand}</p>
                      <p className="text-sm text-muted-foreground mb-3">{perfume.description}</p>
                      <div className="flex flex-wrap gap-1 mb-4">
                        {perfume.notes.map(note => (
                          <Badge key={note} variant="outline" className="text-xs">
                            {note}
                          </Badge>
                        ))}
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-xl font-bold text-primary">
                          {perfume.price.toLocaleString()} ₽
                        </span>
                        <Button size="sm" className="bg-primary hover:bg-primary/90">
                          <Icon name="ShoppingCart" size={16} className="mr-1" />
                          В корзину
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>
          </TabsContent>

          {/* Delivery Tab */}
          <TabsContent value="delivery" className="space-y-6">
            <Card className="bg-white/70 backdrop-blur-sm border-0">
              <CardHeader>
                <CardTitle className="flex items-center text-2xl">
                  <Icon name="Truck" className="mr-3 text-primary" size={28} />
                  Доставка
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Способы доставки</h3>
                    <div className="space-y-3">
                      <div className="flex items-start space-x-3">
                        <Icon name="MapPin" className="text-primary mt-1" size={18} />
                        <div>
                          <p className="font-medium">Курьерская доставка</p>
                          <p className="text-sm text-muted-foreground">1-2 дня, 300 ₽</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <Icon name="Package" className="text-primary mt-1" size={18} />
                        <div>
                          <p className="font-medium">Пункт выдачи</p>
                          <p className="text-sm text-muted-foreground">2-3 дня, 200 ₽</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <Icon name="Mail" className="text-primary mt-1" size={18} />
                        <div>
                          <p className="font-medium">Почта России</p>
                          <p className="text-sm text-muted-foreground">5-10 дней, 150 ₽</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Условия</h3>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-start space-x-2">
                        <Icon name="Check" className="text-green-500 mt-0.5" size={14} />
                        <span>Бесплатная доставка от 5000 ₽</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <Icon name="Check" className="text-green-500 mt-0.5" size={14} />
                        <span>Упаковка в подарочную коробку</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <Icon name="Check" className="text-green-500 mt-0.5" size={14} />
                        <span>Возможность примерки</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Reviews Tab */}
          <TabsContent value="reviews" className="space-y-6">
            <Card className="bg-white/70 backdrop-blur-sm border-0">
              <CardHeader>
                <CardTitle className="flex items-center text-2xl">
                  <Icon name="Star" className="mr-3 text-primary" size={28} />
                  Отзывы покупателей
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {reviews.map((review, index) => (
                    <div key={index} className="border-b border-border/30 pb-4 last:border-b-0">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <p className="font-medium">{review.name}</p>
                          <p className="text-sm text-muted-foreground">{review.perfume}</p>
                        </div>
                        <div className="flex items-center space-x-1">
                          {[...Array(review.rating)].map((_, i) => (
                            <Icon key={i} name="Star" className="text-yellow-400 fill-current" size={16} />
                          ))}
                        </div>
                      </div>
                      <p className="text-muted-foreground">{review.text}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Contacts Tab */}
          <TabsContent value="contacts" className="space-y-6">
            <Card className="bg-white/70 backdrop-blur-sm border-0">
              <CardHeader>
                <CardTitle className="flex items-center text-2xl">
                  <Icon name="Phone" className="mr-3 text-primary" size={28} />
                  Контакты
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <Icon name="MapPin" className="text-primary mt-1" size={20} />
                      <div>
                        <p className="font-medium">Адрес</p>
                        <p className="text-muted-foreground">г. Москва, ул. Тверская, 15</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <Icon name="Phone" className="text-primary mt-1" size={20} />
                      <div>
                        <p className="font-medium">Телефон</p>
                        <p className="text-muted-foreground">+7 (495) 123-45-67</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <Icon name="Mail" className="text-primary mt-1" size={20} />
                      <div>
                        <p className="font-medium">Email</p>
                        <p className="text-muted-foreground">info@parfumerie.ru</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <Icon name="Clock" className="text-primary mt-1" size={20} />
                      <div>
                        <p className="font-medium">Режим работы</p>
                        <p className="text-muted-foreground">Пн-Вс: 10:00 - 22:00</p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Написать нам</h3>
                    <form className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium mb-1">Имя</label>
                        <input 
                          type="text" 
                          className="w-full px-3 py-2 border border-border rounded-lg bg-white/50 focus:outline-none focus:ring-2 focus:ring-primary"
                          placeholder="Ваше имя"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">Email</label>
                        <input 
                          type="email" 
                          className="w-full px-3 py-2 border border-border rounded-lg bg-white/50 focus:outline-none focus:ring-2 focus:ring-primary"
                          placeholder="your@email.com"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">Сообщение</label>
                        <textarea 
                          rows={4}
                          className="w-full px-3 py-2 border border-border rounded-lg bg-white/50 focus:outline-none focus:ring-2 focus:ring-primary"
                          placeholder="Ваше сообщение..."
                        />
                      </div>
                      <Button className="w-full bg-primary hover:bg-primary/90">
                        Отправить сообщение
                      </Button>
                    </form>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      {/* Footer */}
      <footer className="bg-white/80 backdrop-blur-sm border-t border-border/50 mt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <Icon name="Sparkles" className="text-primary" size={24} />
              <span className="text-xl font-bold">Parfumerie</span>
            </div>
            <p className="text-muted-foreground">© 2024 Parfumerie. Все права защищены.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}