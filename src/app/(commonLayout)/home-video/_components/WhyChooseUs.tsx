import { Home, Handshake, Wallet } from 'lucide-react';

const WhyChooseUs = () => {
  const features = [
    {
      icon: Home,
      title: 'Wide Range Of Properties',
      description:
        'lorem ipsum dolor sit amet, consectetur pro adipisici consectetur debits adipisicing lacus consectetur Business Directory.',
    },
    {
      icon: Handshake,
      title: 'Trusted by thousands',
      description:
        'lorem ipsum dolor sit amet, consectetur pro adipisici consectetur debits adipisicing lacus consectetur Business Directory.',
    },
    {
      icon: Wallet,
      title: 'Financing made easy',
      description:
        'lorem ipsum dolor sit amet, consectetur pro adipisici consectetur debits adipisicing lacus consectetur Business Directory.',
    },
  ];

  return (
    <div
      className="h-[600px]"
      style={{
        backgroundImage:
          'url(https://code-theme.com/html/findhouses/images/bg/bg-white-3.png)',
      }}
    >
      <div>
        <h2 className="text-center text-4xl font-bold pt-20">Why Choose Us</h2>
        <p className="text-center text-gray-500">
          We provide full service at every step.
        </p>
      </div>
      <div className=" py-12 md:py-16 lg:py-20">
        <div className="flex flex-wrap justify-center gap-10">
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center p-6 rounded-lg max-w-sm border-2 rounded"
            >
              <div className="mb-4 rounded-full p-3 bg-gray-100">
                <feature.icon
                  className="w-14 h-14 text-gray-500"
                  strokeWidth={1.5}
                />
              </div>
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WhyChooseUs;
